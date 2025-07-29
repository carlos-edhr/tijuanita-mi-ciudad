import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeaders } from "next/headers";
import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";
import z from "zod";
import { User } from "@/payload-types";
// import { stripe } from "@/lib/stripe";

export const authRouter = createTRPCRouter({
  getOneById: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.db.auth({ headers });

      if (!session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const user = await ctx.db.findByID({
        collection: "users",
        id: input.id,
        depth: 2, // Load the "product.image", "product.tenant", and "product.tenant
        // .image"
      });

      return {
        user: user as User,
      };
    }),
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    // console.log({ headers });

    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      // const account = await stripe.accounts.create({});

      // if (!account) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Failed to create Stripe account",
      //   });
      // }
      // const stream =
      // await ctx.db.create({
      //   collection: "streams",
      //   data: {
      //     name: input.username,
      //   },
      // });

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, //this will be hashed
          // stream: [
          //   {
          //     stream: stream.id,
          //   },
          // ],
        },
      });
      //attempt to login after user registration
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "failed to login",
      });
    }

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
