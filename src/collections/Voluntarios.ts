import { isSuperAdmin } from "@/lib/access";
// import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Voluntarios: CollectionConfig = {
  slug: "voluntarios",
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description: "Datos de las personas voluntarias",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Teléfono",
      name: "telefono",
      type: "text",
      required: false,
      admin: {
        description: "Número de teléfono de la persona voluntaria",
      },
    },
    {
      label: "Edad",
      name: "edad",
      //TODO RICH TEXT
      type: "number",
      required: false,
    },
    {
      label: "Ocupación",
      name: "ocupacion",
      type: "text",
      required: false,
      admin: {
        description: "Ocupación de la persona voluntaria",
      },
    },
    {
      name: "comoSeEntero",
      label: "Cómo se enteró la persona acerca del voluntariado",
      type: "select",
      options: [
        `Fui voluntarix en la 2da edición (Mayo 2025)`,
        `Invitación del equipo organizador`,
        `Redes sociales`,
        `UABC`,
        `IBERO`,
        `Otro`,
      ],
      required: false,
      admin: {
        description: "Respuesta a: ¿Cómo te enteraste del voluntariado? ",
      },
    },
    {
      name: "equipo",
      label: "Equipo al que pertenece la persona voluntaria",
      type: "select",
      options: ["REGISTRO", "SEGURIDAD", "MONTAJE-DESMONTAJE", "CONVIVENCIA"],
      required: false,
      admin: {
        description:
          "Respuesta a:  ¿En qué equipo te interesaría participar?  ",
      },
    },
    {
      name: "confirmacionDeDisponibilidad",
      label: "Disponibilidad de la persona voluntaria",
      type: "select",
      options: [
        "Estoy de acuerdo",
        "En desacuerdo",
        "Me comunicaré con la coordinadora para revisar mi caso particular",
      ],
      required: false,
      admin: {
        description:
          "Respuesta a: Es necesario estar disponible de 7:30 a 14:30 horas. Se brindará un lunch e identificativo. Coordinaremos rotación y descansos. ",
      },
    },

    {
      name: "capacitacion1",
      label: "Disponibilidad para la primera capacitación",
      type: "select",
      options: [
        "De acuerdo",
        "Me comunicaré para resolver si no puedo en esta fecha.",
      ],
      required: false,
      admin: {
        description:
          "Respuesta a: La segunda capacitación será presencial (en la vía recreativa) en Playas de Tijuana el día Domingo 24 de Agosto.",
      },
    },
    {
      name: "capacitacion2",
      label: "Disponibilidad para la segunda capacitación",
      type: "select",
      options: [
        "Tengo mayor disponibilidad en la mañana (10am a 12pm)",
        "Tengo mayor disponibilidad en la tarde (12pm a 14pm)",
        "Tengo mayor disponibilidad de las 14pm en adelante",
      ],
      required: false,
      admin: {
        description:
          "Respuesta a: La segunda capacitación será presencial (en la vía recreativa) en Playas de Tijuana el día Domingo 24 de Agosto.",
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
