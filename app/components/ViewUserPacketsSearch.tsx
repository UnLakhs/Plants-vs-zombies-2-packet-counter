"use client";
import { useEffect, useState } from "react";
import { Plant, User } from "../Constants/constants";
import PlantCards from "./PlantCards";

import { CiSearch } from "react-icons/ci";
import OrderBy from "./OrderBy";
import UserPlantCards from "./UserPlantCards";

const ViewUserPacketsSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);



  useEffect(() => {
    const fetchUserFromSession = async () => {
      try {
        const res = await fetch(`/api/Authentication/Session`);
        const data = await res.json();
  
        const userResponse = await fetch(`/api/getUser/${data.user.username}`, {
          method: "GET",
        });
        const userData = await userResponse.json();
  
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user data from session:", error);
      }
    };
    fetchUserFromSession();
  }, []);

  //Filter the results
  useEffect(() => {
    if (!user?.plant_seeds) return; // Ensure plant_seeds is available

    let filtered = user?.plant_seeds.filter((plant: Plant) =>
      plant.plantName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (order === "alphabetical") {
      filtered = filtered?.sort((a, b) =>
        a.plantName.localeCompare(b.plantName)
      );
    } else if (order === "packets-desc") {
      filtered = filtered?.sort((a, b) => b.totalPackets - a.totalPackets);
    }
    setFilteredPlants(filtered);
  }, [searchTerm, user?.plant_seeds, order]);

  return user ? (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-center mb-12 lg:mb-4">
        <div className="lg:mr-auto ml-4 md:ml-32 lg:ml-0 rounded flex py-2 px-3 w-2/3 max-w-sm">
          <OrderBy onOrderChange={setOrder} />
        </div>
        <div className="flex items-center rounded-full bg-white p-2 md:p-4">
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
      <UserPlantCards plants={filteredPlants} />
    </div>
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default ViewUserPacketsSearch;
