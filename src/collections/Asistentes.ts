import { isSuperAdmin } from "@/lib/access";
// import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Asistentes: CollectionConfig = {
  slug: "asistentes",
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    description: "Datos de las personas asistentes a la Vía Recreativa",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "Acompañante de un menor de edad",
      name: "acompañanteMenorDeEdad",
      type: "checkbox",
      required: false,
      admin: {
        description: "Respuesta a: ¿Viene en compañía de un menor de edad?",
      },
    },
    {
      label: "Número de compañantes de un menor de edad",
      name: "cantidadAcompañanteMenorDeEdad",
      type: "number",
      required: false,
      admin: {
        description:
          "Respuesta a: ¿Cuántos menores de edad vienen con usted? Responder con número,",
      },
    },
    {
      label: "Edades de los menores de edad",
      name: "edadesMenoresDeEdad",
      //TODO RICH TEXT
      type: "select",
      options: [
        "0 a 11 meses",
        "1 a 3 años",
        "4 a 6 años",
        "7 a 13 años",
        "14 a 17 años",
        "no aplica",
      ],
      required: false,
      admin: {
        description: "Respuesta a: ¿Qué edad tienen? / no aplica",
      },
    },
    {
      label: "Asistencia de poblaciones prioritarias",
      name: "poblacionesPrioritarias",
      type: "select",
      options: [
        "No",
        "Persona con discapacidad",
        "Embarazada",
        "Persona adulta mayor",
      ],
      required: false,
      admin: {
        description:
          "Respuesta a: ¿Asiste alguna persona dentro de poblaciones prioritarias? ",
      },
    },
    {
      name: "zonaCiudad",
      label: "Zona de procedencia",
      type: "text",
      required: false,
      admin: {
        description: "Respuesta a: ¿De qué zona de la ciudad asiste? ",
      },
    },
    {
      name: "comoSeEntero",
      label: "¿Cómo se enteró del evento? ",
      type: "select",
      options: [
        "Instagram",
        "Facebook",
        "Póster",
        "Invitación de la escuela",
        "Recomendación de boca en boca",
        "Otro",
      ],
      required: false,
      admin: {
        description: "Respuesta a:  ¿Cómo se enteró del evento?   ",
      },
    },
    {
      name: "participacionPrevia",
      label: "¿Ha participado en eventos anteriores?",
      type: "textarea",
      required: false,
      admin: {
        description:
          "Respuesta a: ¿Ha participado en ediciones anteriores de la Vía Recreativa? ",
      },
    },
    {
      name: "comentario",
      label: "¿Pregunta o comentario adicional?",
      type: "textarea",
      required: false,
      admin: {
        description:
          "Respuesta a: ¿Tiene alguna pregunta o comentario? Le responderemos a su correo registrado. ",
      },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
      hasMany: false,
      admin: {
        description:
          "Seleccionar únicamente si la persona voluntaria ya cuenta con un usuario registrado en la plataforma.",
      },
    },
  ],
};
