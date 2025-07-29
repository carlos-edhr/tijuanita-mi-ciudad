import { isSuperAdmin } from "@/lib/access";
// import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description: "Creación y gestión de productos",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "description",
      //TODO RICH TEXT
      type: "richText",
    },
    {
      name: "stream",
      type: "checkbox",
      required: false,
    },
    {
      name: "dateOfStream",
      label: "Fecha de la transmisión (stream)",
      type: "date",

      timezone: true,
      required: false,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in USD",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },

    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description:
          "Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting. ",
      },
    },
    {
      name: "ingressId",
      type: "text",
      required: false,
      admin: {
        description:
          "Configuración para la transmisión, no es necesario agregarla manualmente. ",
      },
    },
    {
      name: "serverUrl",
      type: "text",
      required: false,
      admin: {
        description:
          "Configuración para la transmisión, no es necesario agregarla manualmente. ",
      },
    },
    {
      name: "streamKey",
      type: "text",
      required: false,
      admin: {
        description:
          "Configuración para la transmisión, no es necesario agregarla manualmente. ",
      },
    },
    {
      name: "isLive",
      label: "Archive",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: "If checked, this means that the current stream is live",
      },
    },
    {
      name: "isArchived",
      label: "Archive",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: "If checked, this product will be archived",
      },
    },
    {
      name: "isPrivate",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "If checked, this product will not be shown on the public storefront",
      },
    },
  ],
};
