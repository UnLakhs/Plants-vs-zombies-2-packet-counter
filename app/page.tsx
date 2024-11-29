import AddSeedPackets from "./components/AddSeedPackets";
import Image from "next/image";
import Link from "next/link";
import Search from "./components/Search";

const Home = () => {
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
      <div>
        <Link href="/addPlantData">ADD A FUCKING PLANT MF</Link>
      </div>
      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>

      <AddSeedPackets />
      <Search />
    </div>
  );
};
export default Home;
