import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import crypto from "crypto";

const client = await clientPromise;
const db = client.db("Pvz2");
const userCollection = db.collection("users");

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { username, email, password } = data;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await crypto.createHash("sha256").update(password).digest("hex");

    await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
