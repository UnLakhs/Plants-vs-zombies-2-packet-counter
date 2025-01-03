//Utilities
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

//Components
import AddSeedPackets from "./components/AddSeedPackets";
import Image from "next/image";
import { User } from "./Constants/constants";
import ViewUserPacketsSearch from "./components/ViewUserPacketsSearch";

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

const Home = async () => {
  const user = await getUser();
  return user ? (
    <div className="flex flex-col items-center w-full h-screen justify-between space-y-4">
      {/* <div className="hidden lg:block w-32 h-32 absolute sm:top-20 sm:left-2 z-50">
        <Image
          src={`/assets/images/logo.png`}
          layout="fill"
          objectFit="contain"
          alt="logo"
          className="z-10"
        />
      </div> */}

      <h1 className="text-3xl text-black font-bold">
        Welcome to Seed packet counter!
      </h1>

      <AddSeedPackets />
      <ViewUserPacketsSearch />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <span className="font-bold text-4xl">
        You need to be logged in to insert and see seed packets
      </span>
    </div>
  );
};
export default Home;
