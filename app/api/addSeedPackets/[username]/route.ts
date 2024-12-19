import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { User, Plant } from "@/app/Constants/constants"; // Import User and Plant types

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Pvz2");

    // Parse the request body
    const data = await request.json();
    const { plantName, packets } = data;

    // Extract username from params
    const username = (await params).username;

    // Validate input
    if (!plantName || !packets) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = (await db.collection("users").findOne({
      username: username,
    })) as User | null;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the plant already exists in the user's plant_seeds
    const existingPlant = user.plant_seeds?.find(
      (plant: Plant) => plant.plantName === plantName
    ) as Plant;
    let newTotalPackets: Number;

    if (existingPlant) {
      newTotalPackets = existingPlant.totalPackets + Number(packets);
      // Add the plant to the user's plant_seeds
      await db.collection<Document>("users").updateOne(
        { username, "plant_seeds.plantName": plantName }, // Correctly locate the nested plant
        {
          $set: {
            "plant_seeds.$.packets": Number(packets), // Update the packets
            "plant_seeds.$.totalPackets": newTotalPackets, // Update the totalPackets
          },
        }
      );
    } else {
      //add the plant
      newTotalPackets = Number(packets);
      await db.collection<Document>("users").updateOne(
        { username },
        {
          $push: {
            plant_seeds: {
              plantName,
              packets: Number(packets),
              totalPackets: newTotalPackets,
            },
          },
        }
      );
    }

    return NextResponse.json({
      message: "Plant data added successfully to the user",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to add plant data" },
      { status: 500 }
    );
  }
}
