// import Image from "next/legacy/image";
import AddSeedPackets from "../components/AddSeedPackets";
import Search from "../components/Search";

const ViewPlants = async () => {
  return (
    <div className="flex flex-col items-center h-screen justify-between space-y-4">
      {/* <div className="w-32 h-32 absolute top-16 left-2 z-50">
        <Image
          src={`/assets/images/logo.png`}
          layout="fill"
          objectFit="contain"
          alt="logo"
          className="z-10"
        />
      </div> */}
      <h1 className="text-3xl font-bold">Welcome to Seed packet counter!</h1>

      <AddSeedPackets />    
      <Search />
    </div>
  );
};
export default ViewPlants;
