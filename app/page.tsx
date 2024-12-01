import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AddSeedPackets from "./components/AddSeedPackets";
import Image from "next/image";
import Link from "next/link";
import Search from "./components/Search";

const JWT_SECRET = process.env.JWT_SECRET;

const Home = async () => {
  let isAdmin = false;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token && JWT_SECRET) {
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
      console.log("decodedToken:", decodedToken);
      isAdmin = decodedToken.isAdmin;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
  return (
    <div className="flex flex-col items-center h-screen justify-between space-y-4">
      <div className="w-32 h-32 absolute top-4 left-4 z-50">
        <Image
          src={`/assets/images/logo.png`}
          layout="fill"
          objectFit="contain"
          alt="logo"
          className="z-10"
        />
      </div>
      {isAdmin && (
        <div>
          <Link href="/addPlantData">Admins only. Add plant data</Link>
        </div>
      )}

      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>

      <AddSeedPackets />
      <div className="p-2 bg-blue-500 rounded-full text-white">
        <Link href={`/Authentication/Login`}>Log in</Link>
      </div>
      <Search />
    </div>
  );
};
export default Home;
