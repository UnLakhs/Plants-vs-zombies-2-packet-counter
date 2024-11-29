"use client";
import { useEffect, useState } from "react";
import { Plant } from "../Constants/constants";
import PlantCards from "./PlantCards";

import { CiSearch } from "react-icons/ci";
import OrderBy from "./OrderBy";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [order, setOrder] = useState("");

  useEffect(() => {
    const fetchPlantData = async () => {
      const res = await fetch("api/data", {
        method: "GET",
      });
      const data = await res.json();
      setPlantData(data);
      setFilteredPlants(data);
    };
    fetchPlantData();
  }, []);

  //Filter the results
  useEffect(() => {
    let filtered = plantData.filter((plant) =>
      plant.plantName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (order === "alphabetical") {
      filtered = filtered.sort((a, b) =>
        a.plantName.localeCompare(b.plantName)
      );
    } else if (order === "packets-desc") {
      filtered = filtered.sort((a, b) => b.totalPackets - a.totalPackets);
    }
    setFilteredPlants(filtered);
  }, [searchTerm, plantData, order]);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <div className="mr-auto rounded flex py-2 px-3 w-2/3 max-w-sm">
          <OrderBy onOrderChange={setOrder} />
        </div>
        <div className="flex items-center rounded-full bg-white p-4">
          <input
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none"
          />
          <CiSearch size={25} />
        </div>
      </div>
      {/* Render filtered plant cards */}
      <PlantCards plants={filteredPlants} />
    </div>
  );
};

export default Search;
