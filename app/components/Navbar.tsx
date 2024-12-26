"use client";

import { useEffect, useState } from "react";
import { User } from "../Constants/constants";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`/api/Authentication/Session`);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to retrieve user data: ", error);
      }
    };
    getUserData();
  }, []);

  return (
    <nav className="bg-[#3c7836] p-4 w-screen transition-all duration-300">
      <div className="flex justify-between items-center p-2">
        {/* Burger Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white lg:hidden"
        >
          {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>
      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "flex flex-col lg:flex-row gap-2" : "hidden"
        } lg:flex lg:gap-8 bg-[#3c7836] w-full lg:h-full transition-all duration-300`}
      >
        <Link className="text-xl font-semibold" href={`/ViewPlants`}>Plants</Link>
        <Link className="text-xl font-semibold" href={`/`}>View your seed packets</Link>
        {user?.isAdmin && <Link className="text-xl font-semibold" href={`/addPlantData`}>Add plant data</Link>}
        {user ? (
          <span className="text-xl font-semibold">Welcome {user?.username}</span>
        ) : (
          <Link className="text-xl font-semibold" href={`/Authentication/Login`}>Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
