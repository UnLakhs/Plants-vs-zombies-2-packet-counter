import AddSeedPackets from "./components/AddSeedPackets";
import PlantCards from "./components/PlantCards";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-between">
      <div className="w-48 h-screen relative">
        <Image src={`/assets/images/logo.png`} layout="fill" objectFit="contain" alt="logo" />
      </div>
      <div><Link href="/addPlantData">ADD A FUCKING PLANT MF</Link></div>
      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>
      <AddSeedPackets />
      <PlantCards />
    </div>
  );
};
export default Home;
