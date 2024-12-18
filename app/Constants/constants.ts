import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export interface Plant {
  _id: string;
  plantName: string;
  packets?: number;
  totalPackets: number;
  image: string;
}

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  plant_seeds: Plant[];
}

export const inputStyles = `shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`;

export const getUserIdFromToken = (req: NextRequest) => {
  try {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (!token) return null;

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: ObjectId;
          username: string;
          isAdmin: boolean;
      };

      return { id: decoded.id, username: decoded.username, isAdmin: decoded.isAdmin };
  } catch (error) {
      console.error("Error decoding token:", error);
      return null;
  }
};
