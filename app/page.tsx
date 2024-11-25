import AddSeedPackets from "./components/AddSeedPackets";
import PlantCards from "./components/PlantCards";
import Image from "next/legacy/image";

const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-between">
      <div className="w-48 h-52 relative">
        <Image src={`/assets/images/logo.png`} layout="fill" alt="logo" />
      </div>
      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>
      <AddSeedPackets />
      <PlantCards />
    </div>
  );
};
export default Home;
