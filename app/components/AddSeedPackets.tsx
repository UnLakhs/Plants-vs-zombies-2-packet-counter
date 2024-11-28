"use client";
import { useEffect, useState } from "react";
import { Plant } from "../Constants/constants";


const AddSeedPackets = () => {
  const [plantName, setPlantName] = useState("");
  const handlePlantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlantName(event.target.value);
  };
  const [plantNameList, setPlantNameList] = useState<Plant[]>([]);

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

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
        alert('Data added');
      } else {
        const errorData = await response.json();
        console.error("Failed to insert data:", errorData.error);
        alert('Failer to insert data');
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <form onSubmit={handleSubmit} className="text-black">
        <div className="mb-4">
          <label
            htmlFor="plantName"
            className="block font-bold mb-2"
          >
            Plant Name:
          </label>
          <input
            id="plantName"
            name="plantName"
            value={plantName}
            onChange={handlePlantNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
            {/* <option value=""></option> */}
            {/* Add your plant options here */}
            {/* {plantNameList.map((plant) => (
              <option key={plant.plantName} value={plant.plantName}>
                {plant.plantName}
              </option>
            ))}*/}
          
        </div>

        <div className="mb-4">
          <label
            htmlFor="packets"
            className="block font-bold mb-2"
          >
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
    </div>
  );
};

export default AddSeedPackets;
