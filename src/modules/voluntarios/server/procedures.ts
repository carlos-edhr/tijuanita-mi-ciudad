// voluntarios/procedures.ts
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { voluntarioSchema } from "../schema";

export const voluntariosRouter = createTRPCRouter({
  create: baseProcedure
    .input(voluntarioSchema)
    .mutation(async ({ input, ctx }) => {
      const voluntario = await ctx.db.create({
        collection: "voluntarios",
        data: {
          ...input,
          // Mapeo de campos si es necesario
        },
      });

      return {
        success: true,
        voluntario,
      };
    }),
});
