export interface Plant {
  _id: string;
  plantName: string;
  packets: number;
  totalPackets: number;
  image: string;
}

const fetchPlantData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

const PlantCards = async () => {
  const plantData: Plant[] = await fetchPlantData();

  return (
    <div className="grid grid-cols-5 gap-6">
      {plantData.map((plant) => (
        <div className="mb-4 rounded-md shadow-xl shadow-gray-800 p-3 bg-green-500 flex flex-col gap-2 items-center justify-center" key={plant._id}>
          <h2 className="text-2xl font-bold">{plant.plantName}</h2>
          <div className="w-24 h-24 relative">
            <img
                src={`/assets/images/${plant.image}`}
                alt={`${plant.plantName} image`}
                className="w-full h-full absolute"
            />
          </div>
          <span className="text-xl font-semibold">Total Packets: {plant.totalPackets}</span>
        </div>
      ))}
    </div>
  );
};

export default PlantCards;
