import { User } from "@/app/Constants/constants";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params; // Get the username directly from params
    const client = await clientPromise;
    const db = client.db("Pvz2");

    // Find the user by username
    const user = (await db.collection("users").findOne({ username })) as User | null;

    if (!user) {
      return NextResponse.json(
        { error: `User with username '${username}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in fetching user seed packets:", error);
    return NextResponse.json(
      { error: "Error in fetching user seed packets" },
      { status: 500 }
    );
  }
}
