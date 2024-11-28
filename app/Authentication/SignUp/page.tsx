"use client";
import { useState } from "react";
import { inputStyles } from "@/app/Constants/constants";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`/api/Authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User created successfully!");
      } else {
        setErrorMessage(result.error || "User creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">
      <form onSubmit={handleSubmit} className="shadow-xl shadow-green-600">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`${inputStyles}`}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${inputStyles}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${inputStyles}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </form>
      <div className="p-2 rounded-full hover:opacity-80 transition duration-200 mt-4 bg-green-400">
        <Link className="font-bold" href={`/Authentication/Login`}>Already have an account? Log in!</Link>
      </div>
    </div>
  );
};

export default SignUp;
