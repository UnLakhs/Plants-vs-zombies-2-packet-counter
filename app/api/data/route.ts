import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Pvz2");
    const plantCollection = db.collection("plants");
    const data = await plantCollection.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Pvz2");
    const plantCollection = db.collection("plants");
    const data = await request.json();

    if (!data.plantName || !data.packets) {
      return NextResponse.json(
        { error: "Missing plant name or packets" },
        { status: 400 }
      );
    }

    //find the plant that matches the plant name
    const existingPlant = await plantCollection.findOne({
      plantName: data.plantName,
    });

    if (existingPlant) {
      const updatedPackets: number =
        (existingPlant.totalPackets || 0) + Number(data.packets);
      await plantCollection.updateOne(
        { _id: existingPlant._id },
        { $set: { totalPackets: updatedPackets } }
      );
      return NextResponse.json({ message: "Packets updated successfully" });
    }
    //Handle the non-existing plant
    else {
      await plantCollection.insertOne({
        plantName: data.plantName,
        packets: Number(data.packets),
        totalPackets: Number(data.packets), // Initialize totalPackets here
      });
      return NextResponse.json({ message: "New plant added successfully" });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
