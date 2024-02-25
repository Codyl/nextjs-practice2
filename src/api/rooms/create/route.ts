import { db } from "@/db/db";
import { Room, room } from "@/db/schema";
// import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { text, roomId } = await req.json();

  // pusherServer.trigger(roomId, "incoming-message", text);

  const createdRoomData = await db
    .insert(room)
    .values({}) // Provide actual encounter ID
    .returning();

  const createdRoom: Room = createdRoomData[0] as Room;
  console.log(createdRoom);

  return new Response(String(createdRoom.id));
}
