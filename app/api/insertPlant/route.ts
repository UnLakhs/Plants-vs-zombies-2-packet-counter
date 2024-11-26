import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { plantName: string } }
) {
  try {
    const client = await clientPromise;
    const db = await client.db("Pvz2");
    const plantName = params.plantName;
    const plant = await db.collection("plants").findOne({ name: plantName });
    return new Response(JSON.stringify(plant));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = await client.db("Pvz2");
    const data = await request.json();

    const { plantName, packets, totalpackets, image } = data;

    const existingPlant = await db
      .collection("plants")
      .findOne({ plantName: plantName });
    if (existingPlant) {
      return NextResponse.json(
        { error: "Plant already exists" },
        { status: 409 }
      );
    }

    //Insert new plant
    await db.collection("plants").insertOne({
      plantName: plantName,
      packets: Number(packets),
      totalPackets: Number(packets),
      image: image,
    });

    return NextResponse.json({ message: "Plant data inserted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to insert plant data" },
      { status: 500 }
    );
  }
}
