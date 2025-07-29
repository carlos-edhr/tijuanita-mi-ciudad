"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import config from "@payload-config";

// import { isBlockedbyUser } from "@/lib/block-service";
import { currentUser } from "@/lib/auth";
// import { trpc } from "@/trpc/server";
// import { Query } from "@tanstack/react-query";
// import { User } from "@/payload-types";
import { getPayload } from "payload";

export const createViewerToken = async (hostIdentity: string) => {
  //get the host user
  const payload = await getPayload({ config });
  const host = await payload.findByID({
    collection: "users", // required
    id: hostIdentity, // required
    depth: 2,
  });
  console.log("Host HOST ---> ", host);
  //get current user
  let self;
  try {
    self = await currentUser();

    if (!self) {
      throw new Error("User not found");
    }
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  // const {user} = await trpc.auth.getOneById.queryOptions({
  //   id: hostIdentity,
  // });
  // const { user } = result.user;

  if (!host) {
    throw new Error("Host user not found");
  }

  // const isBlocked = await isBlockedbyUser(host.id);

  // if (isBlocked) {
  //   throw new Error("User is blocked");
  // }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    },
  );
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return await Promise.resolve(token.toJwt());
};
