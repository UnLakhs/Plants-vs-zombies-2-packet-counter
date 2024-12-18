"use client";
import { useEffect, useState } from "react";
import { Plant, User } from "../Constants/constants";

const AddSeedPackets = () => {
  const [plantName, setPlantName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [filteredPlantNameList, setFilteredPlantNameList] = useState<Plant[]>(
    []
  );
  const [plantNameList, setPlantNameList] = useState<Plant[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchPlants = async () => {
      const res = await fetch("/api/data", {
        method: "GET",
      });
      const data = await res.json();
      setPlantNameList(data);
      return data;
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/Authentication/Session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user session", error);
      }
    };
    fetchUser();
  }, []);

  const handlePlantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPlantName(value);
    // Filter plantNameList to match user input (case-insensitive)
    const filteredPlants = plantNameList.filter((plant) =>
      plant.plantName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlantNameList(filteredPlants);

    // Show dropdown only if there are matches and input isn't empty
    setShowDropdown(filteredPlants.length > 0 && value !== "");
  };
  // Handle dropdown option click
  const handleOptionClick = (selectedPlantName: string) => {
    setPlantName(selectedPlantName);
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(user?.username)
    try {
      const response = await fetch(
        `/api/addSeedPackets/${user?.username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data sent successfully!");
        alert("Data added");
      } else {
        const errorData = await response.json();
        console.error("Failed to insert data:", errorData.error);
        alert("Failer to insert data");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {user && (
        <form
          onSubmit={handleSubmit}
          className="text-black relative w-full max-w-md"
        >
          <div className="mb-4">
            <label htmlFor="plantName" className="block font-bold mb-2">
              Plant Name:
            </label>
            <input
              id="plantName"
              name="plantName"
              value={plantName}
              onChange={handlePlantNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="off"
              required
            />
            {/* Autocomplete dropdown */}
            {showDropdown && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto">
                {filteredPlantNameList.map((plant) => (
                  <li
                    key={plant.plantName}
                    onClick={() => handleOptionClick(plant.plantName)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                  >
                    {plant.plantName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="packets" className="block font-bold mb-2">
              Number of Packets:
            </label>
            <input
              type="number"
              id="packets"
              name="packets"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Packets
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddSeedPackets;
