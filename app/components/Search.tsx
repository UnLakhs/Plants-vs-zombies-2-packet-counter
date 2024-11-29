"use client";
import { useEffect, useState } from "react";
import { Plant } from "../Constants/constants";
import PlantCards from "./PlantCards";

import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

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
    const filtered = plantData.filter((plant) =>
      plant.plantName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  }, [searchTerm, plantData]);

  return (
    <div className="flex flex-col">
      <div className="mb-4 ml-auto justify-between flex border rounded py-2 px-3 w-full max-w-md bg-white">
        <input
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <CiSearch size={25} />
      </div>
      {/* Render filtered plant cards */}
      <PlantCards plants={filteredPlants} />
    </div>
  );
};

export default Search;
