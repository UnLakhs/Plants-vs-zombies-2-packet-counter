import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("Pvz2");
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await crypto.timingSafeEqual(
      Buffer.from(password),
      Buffer.from(user.password)
    );
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
