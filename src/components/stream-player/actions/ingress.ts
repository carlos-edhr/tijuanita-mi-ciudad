"use server";
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

// import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { getPayload } from "payload";
import config from "@payload-config";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const payload = await getPayload({ config });
  const self = await currentUser();
  //TODO: reset previous ingress

  if (self && typeof self.id === "string") {
    await resetIngresses(self.id);
  } else {
    throw new Error("User is not authenticated or user ID is invalid");
  }

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await payload.db.updateOne({
    collection: "orders",
    where: {
      user: {
        equals: self.id,
      },
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};

//<--- to use with new livekit versions --->
// "use server";
// import {
//   IngressAudioEncodingPreset,
//   IngressInput,
//   IngressClient,
//   IngressVideoEncodingPreset,
//   RoomServiceClient,
//   type CreateIngressOptions,
// } from "livekit-server-sdk";

// import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

// import { db } from "@/lib/db";
// import { getSelf } from "@/lib/auth-service";
// import { revalidatePath } from "next/cache";

// const roomService = new RoomServiceClient(
//   process.env.LIVEKIT_API_URL!,
//   process.env.LIVEKIT_API_KEY!,
//   process.env.LIVEKIT_API_SECRET!,
// );

// const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

// export const resetIngresses = async (hostIdentity: string) => {
//   const ingresses = await ingressClient.listIngress({
//     roomName: hostIdentity,
//   });

//   const rooms = await roomService.listRooms([hostIdentity]);

//   for (const room of rooms) {
//     await roomService.deleteRoom(room.name);
//   }

//   for (const ingress of ingresses) {
//     if (ingress.ingressId) {
//       await ingressClient.deleteIngress(ingress.ingressId);
//     }
//   }
// };

// export const createIngress = async (ingressType: IngressInput) => {
//   const self = await getSelf();
//   //TODO: reset previous ingress

//   await resetIngresses(self.id);

//   const options: CreateIngressOptions = {
//     name: self.username,
//     roomName: self.id,
//     participantName: self.username,
//     participantIdentity: self.id,
//   };

//   if (ingressType === IngressInput.WHIP_INPUT) {
//     options.bypassTranscoding = true;
//   } else {
//     options.video = {
//       source: TrackSource.CAMERA,
//       preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
//     };
//     options.audio = {
//       source: TrackSource.MICROPHONE,
//       preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
//     };
//   }

//   const ingress = await ingressClient.createIngress(ingressType, options);

//   if (!ingress || !ingress.url || !ingress.streamKey) {
//     throw new Error("Failed to create ingress");
//   }

//   await db.stream.update({
//     where: { userId: self.id },
//     data: {
//       ingressId: ingress.ingressId,
//       serverUrl: ingress.url,
//       streamKey: ingress.streamKey,
//     },
//   });
//   revalidatePath(`/u/${self.username}/keys`);
//   return ingress;
// };
