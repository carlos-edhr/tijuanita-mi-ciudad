import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import config from "@payload-config";

// import { currentUser } from "@/lib/auth";
import { getPayload } from "payload";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const payload = await getPayload({ config });
  const authorization = headerPayload.get("authorization");

  if (!authorization) {
    return new Response("No authorization header", { status: 400 });
  }

  const event = receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    await payload.db.updateOne({
      collection: "orders", // required
      where: {
        ingress: {
          equals: event.ingressInfo?.ingressId,
        },
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await payload.db.updateOne({
      collection: "orders", // required
      where: {
        ingress: {
          equals: event.ingressInfo?.ingressId,
        },
      },
      data: {
        isLive: false,
      },
    });
  }
}
