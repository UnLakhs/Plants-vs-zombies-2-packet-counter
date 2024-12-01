"use client";

import Link from "next/link";
import { useState } from "react";

const addPlantData = () => {
  const [plantName, setPlantName] = useState("");
  const handlePlantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlantName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const plantName = formData.get("plantName");
    const image = formData.get("image");

    try {
      const response = await fetch(`/api/insertPlant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantName,
          image,
        }),
      });
      if (response.ok) {
        alert("Data added");
        console.log(`plantName: ${plantName}, image: ${image}`);
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-12 items-center text-center justify-center h-screen mb-6">
      <h1 className="text-4xl font-bold">Insert New Plant Data</h1>
      <form className="text-black" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="plantName" className="block font-bold mb-2">
            Plant Name:
          </label>
          <input
            name="plantName"
            id="plantName"
            onChange={handlePlantNameChange}
            value={plantName}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-2">
            Plant image:
          </label>
          <input
            id="image"
            name="image"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add plant
          </button>
        </div>
      </form>

      <Link href={`/`}>return to home page</Link>
    </div>
  );
};

export default addPlantData;
