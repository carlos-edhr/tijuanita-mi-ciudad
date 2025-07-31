import { baseProcedure, createTRPCRouter } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";
import { asistenteSchema } from "../schema";

export const asistentesRouter = createTRPCRouter({
  create: baseProcedure
    .input(asistenteSchema)
    .mutation(async ({ input, ctx }) => {
      const asistente = await ctx.db.create({
        collection: "asistentes",
        data: {
          ...input,
          // Map field names to match Payload CMS collection
          // "Zona de la ciudad donde vive": input.zonaCiudad,
          //"Cómo se enteró del evento?": input.comoSeEntero,
          //"¿Ha participado en eventos anteriores?": input.participacionPrevia,
          //"¿Pregunta o comentario adicional?": input.comentario,
        },
      });

      return {
        success: true,
        asistente,
      };
    }),
});
