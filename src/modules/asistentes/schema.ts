import { z } from "zod";

const edadesOptions = [
  "0 a 11 meses",
  "1 a 3 años",
  "4 a 6 años",
  "7 a 13 años",
  "14 a 17 años",
  "no aplica",
] as const;

const poblacionesOptions = [
  "No",
  "Persona con discapacidad",
  "Embarazada",
  "Persona adulta mayor",
] as const;

const comoSeEnteroOptions = [
  "Instagram",
  "Facebook",
  "Póster",
  "Invitación de la escuela",
  "Recomendación de boca en boca",
  "Otro",
] as const;

export const asistenteSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  acompañanteMenorDeEdad: z.boolean().default(false).optional(),
  cantidadAcompañanteMenorDeEdad: z.number().default(0).optional(),
  edadesMenoresDeEdad: z.enum(edadesOptions).optional().nullable(),
  poblacionesPrioritarias: z.enum(poblacionesOptions).optional().nullable(),
  zonaCiudad: z.string().default("No especificado").optional(),
  comoSeEntero: z.enum(comoSeEnteroOptions).optional().nullable(),
  participacionPrevia: z.string().default("No especificado").optional(),
  comentario: z.string().default("No especificado").optional(),
});
