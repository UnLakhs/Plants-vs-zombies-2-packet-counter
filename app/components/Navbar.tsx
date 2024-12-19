"use client";

import { useEffect, useState } from "react";
import { User } from "../Constants/constants";
import { get } from "http";
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <nav className="bg-green-400 p-4">
      <div className="flex flex-row gap-12 text-lg">
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
