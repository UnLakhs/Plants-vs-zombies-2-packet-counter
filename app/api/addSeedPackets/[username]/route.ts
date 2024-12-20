import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
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

    // Get the current date
    const currentDate = new Date();
    // Initialize week_starts and week_ends if they are not set
    if (!user.week_starts) {
      const weekStart = currentDate; // Current date as week start
      const weekEnd = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // One week later

      await db.collection("users").updateOne(
        { username },
        {
          $set: {
            week_starts: weekStart,
            week_ends: weekEnd,
          },
        }
      );

      user.week_starts = weekStart; // Update the local user object
    }
    const weekStartDate = new Date(user.week_starts);
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
    const weekEndDate = new Date(weekStartDate.getTime() + oneWeekInMs);

    // Check if the current week has ended
    if (currentDate >= weekEndDate) {
      // Archive the week's data and reset
      await db.collection<Document>("users").updateOne(
        { username },
        {
          $push: {
            weeklyHistory: {
              weekStart: user.week_starts,
              weekEnd: weekEndDate,
              collected_seeds: user.plant_seeds || [],
            },
          },
          $set: {
            plant_seeds: [],
            week_starts: currentDate, // Start a new week
          },
        }
      );
    }

    // Check if the plant already exists in the user's plant_seeds
    const existingPlant = user.plant_seeds?.find(
      (plant: Plant) => plant.plantName === plantName
    ) as Plant;
    let newTotalPackets: number;

    if (existingPlant) {
      newTotalPackets = existingPlant.totalPackets + Number(packets);

      // Update the existing plant
      await db.collection("users").updateOne(
        { username, "plant_seeds.plantName": plantName },
        {
          $set: {
            "plant_seeds.$.packets": Number(packets),
            "plant_seeds.$.totalPackets": newTotalPackets,
          },
        }
      );
    } else {
      newTotalPackets = Number(packets);

      // Add a new plant
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
    console.error("Error adding plant data:", error);
    return NextResponse.json(
      { error: "Failed to add plant data" },
      { status: 500 }
    );
  }
}
