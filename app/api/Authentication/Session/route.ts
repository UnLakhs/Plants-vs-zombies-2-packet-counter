//This is used in the client side in order to get the user from cookies
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/Constants/constants";

export async function GET(request: NextRequest) {
  
    try {
        const token = request.headers.get("cookie")?.split("; ").find(cookie => cookie.startsWith("token="))?.split("=")[1];

        if(!token || !process.env.JWT_SECRET) 
            return NextResponse.json({ user: null }, { status: 401 });

        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.json({ user: decodedToken as User }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }

  
}