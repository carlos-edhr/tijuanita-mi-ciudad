import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { asistentesRouter } from "@/modules/asistentes/server/procedures";
import { voluntariosRouter } from "@/modules/voluntarios/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,

  asistentes: asistentesRouter,
  voluntarios: voluntariosRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
