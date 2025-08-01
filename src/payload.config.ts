import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
// import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
// import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Voluntarios } from "./collections/Voluntarios";
import { Asistentes } from "./collections/Asistentes";
import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: ["@/components/stripe-verify#StripeVerify"],
    },
  },
  collections: [
    Users,
    Media,
    Voluntarios,
    Asistentes,
    // Categories,
    // Products,
    // Tags,
    // Tenants,
    // Orders,
    // Reviews,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // multiTenantPlugin<Config>({
    //   collections: {
    //     products: {},
    //     media: {},
    //   },
    //   tenantsArrayField: {
    //     includeDefaultField: false,
    //   },
    //   userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    // }),
    // vercelBlobStorage({
    //   enabled: true,
    //   collections: {
    //     media: true,
    //   },
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    // }),
  ],
});
