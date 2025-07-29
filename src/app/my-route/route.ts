import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  // Import or define the correct collection slug type
  // If your payload config exports collection slugs, import it like:
  // import { collections } from "@payload-config";
  // and use: collection: collections.categories.slug

  const data = await payload.find({
    collection: "users", // Replace with the correct slug type if available
  });

  return Response.json(data);
};
