//Utilities
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

//Components
import Image from "next/legacy/image";
import Link from "next/link";
import AddSeedPackets from "../components/AddSeedPackets";
import Search from "../components/Search";
import { User } from "../Constants/constants";


const JWT_SECRET = process.env.JWT_SECRET;

const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    if (token && JWT_SECRET) {
      const decodedToken = jwt.verify(token, JWT_SECRET as string) as User;
      return decodedToken;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
};

const ViewPlants = async () => {
  const user = await getUser();
  return (
    <div className="flex flex-col items-center h-screen justify-between space-y-4">
      <div className="w-32 h-32 absolute top-16 left-2 z-50">
        <Image
          src={`/assets/images/logo.png`}
          layout="fill"
          objectFit="contain"
          alt="logo"
          className="z-10"
        />
      </div>
      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>

      <AddSeedPackets />    
      <Search />
    </div>
  );
};
export default ViewPlants;
