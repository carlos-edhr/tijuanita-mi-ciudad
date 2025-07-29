"use server";

import { revalidatePath } from "next/cache";
// import { db } from "@/lib/db";
// import { Stream } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { getPayload } from "payload";
import config from "@payload-config";

export const updateStream = async (values: any) => {
  const payload = await getPayload({ config });
  try {
    const self = await currentUser();
    if (!self) {
      throw new Error("User not found");
    }
    const selfStream = await payload.db.findOne({
      collection: "orders",
      where: {
        user: {
          equals: self.id,
        },
      },
    });

    // await db.stream.findUnique({
    //   where: {
    //     userId: self.id,
    //   },
    // });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    // console.log({ validData });

    const stream = await payload.db.updateOne({
      collection: "orders",
      where: {
        user: {
          equals: self.id,
        },
      },
      data: {
        ...validData,
      },
    });

    // await db.stream.update({
    //   where: {
    //     id: selfStream.id,
    //   },
    //   data: {
    //     ...validData,
    //   },
    // });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal error");
  }
};
