import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
  const { plantId } = params;
  const { packets } = await req.json();

  if (!packets) {
    return NextResponse.json(
      { error: "Number of packets is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("Pvz2");
    const result = await db
      .collection("plants")
      .updateOne({ _id: plantId }, { $inc: { packets: packets } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Packets updated successfully" });
  } catch (error) {
    console.error("Error updating packets:", error);
    return NextResponse.json(
      { error: "Error updating packets" },
      { status: 500 }
    );
  }
}
