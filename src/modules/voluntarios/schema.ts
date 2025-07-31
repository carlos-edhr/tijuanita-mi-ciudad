// voluntarios/schema.ts
import { z } from "zod";

const comoSeEnteroOptions = [
  "Fui voluntarix en la 2da edición (Mayo 2025)",
  "Invitación del equipo organizador",
  "Redes sociales",
  "UABC",
  "IBERO",
  "Otro",
] as const;

const equipoOptions = [
  "REGISTRO",
  "SEGURIDAD",
  "MONTAJE-DESMONTAJE",
  "CONVIVENCIA",
] as const;

const disponibilidadOptions = [
  "Estoy de acuerdo",
  "En desacuerdo",
  "Me comunicaré con la coordinadora para revisar mi caso particular",
] as const;

const capacitacion1Options = [
  "De acuerdo",
  "Me comunicaré para resolver si no puedo en esta fecha.",
] as const;

const capacitacion2Options = [
  "Tengo mayor disponibilidad en la mañana (10am a 12pm)",
  "Tengo mayor disponibilidad en la tarde (12pm a 14pm)",
  "Tengo mayor disponibilidad de las 14pm en adelante",
] as const;

export const voluntarioSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  name: z.string().min(1, "El nombre es obligatorio"),
  telefono: z.string().optional(),
  edad: z
    .number()
    .int()
    .positive("La edad debe ser un número positivo")
    .optional(),
  ocupacion: z.string().optional(),
  comoSeEntero: z.enum(comoSeEnteroOptions).optional(),
  equipo: z.enum(equipoOptions).optional(),
  confirmacionDeDisponibilidad: z.enum(disponibilidadOptions).optional(),
  capacitacion1: z.enum(capacitacion1Options).optional(),
  capacitacion2: z.enum(capacitacion2Options).optional(),
});
