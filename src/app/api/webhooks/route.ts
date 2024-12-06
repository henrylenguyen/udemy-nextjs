import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  if (!webhookSecret) {
    return new Response("Webhook secret is not set", { status: 500 });
  }
  const payload = await req.json();

  const body = JSON.stringify(payload);

  const sivx = new Webhook(webhookSecret);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  console.log(msg);
  const eventType = msg.type
  if (eventType === 'user.created') {
    // Tạo database
    console.log(msg.data)
  }
  // Rest

  return new Response("OK", { status: 200 });
}