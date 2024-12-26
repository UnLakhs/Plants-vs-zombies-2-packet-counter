import { Plant } from "../Constants/constants";
interface plantCardsProps {
  plants: Plant[];
}

const PlantCards = ({plants}: plantCardsProps) => {

  return (
    <div className="grid grid-cols-5 gap-6">
      {plants?.map((plant) => (
        <div
          className="mb-4 rounded-md shadow-xl shadow-gray-800 p-3 bg-[#4a9242] flex flex-col gap-2 items-center justify-center"
          key={plant.plantName}
        >
          <h2 className="text-2xl font-bold">{plant.plantName}</h2>
          <div className="w-24 h-24 relative">
            <img
              src={`/assets/images/${plant.image}`}
              alt={`${plant.plantName} image`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantCards;
