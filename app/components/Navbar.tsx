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
    <nav className="bg-[#55a94c] p-4 w-screen transition-all duration-300">
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
          isMenuOpen ? "flex flex-col gap-2" : "hidden"
        } bg-[#55a94c] w-full lg:h-full transition-all duration-300`}
      >
        <Link href={`/ViewPlants`}>Plants</Link>
        <Link href={`/`}>View your seed packets</Link>
        {user?.isAdmin && <Link href={`/addPlantData`}>Add plant data</Link>}
        {user ? (
          <span>Welcome {user?.username}</span>
        ) : (
          <Link href={`/Authentication/Login`}>Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
