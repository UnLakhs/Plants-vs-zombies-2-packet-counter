import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcrypt";
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
