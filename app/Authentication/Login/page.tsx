"use client";
import { useState } from "react";
import { inputStyles } from "@/app/Constants/constants";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`/api/Authentication/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User logged in successfully!");
        window.location.href = "/";
      } else {
        setErrorMessage(result.error || "User creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-8 text-center">
      <form onSubmit={handleSubmit} className="shadow-xl p-12 bg-[#3c7836] shadow-black">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
          Log in
        </button>
      </form>
      <Link className="bg-[#468d3f] rounded-md text-lg font-semibold text-black p-2" href={"/Authentication/SignUp"}>
        Don&apos;t have an account? Sign Up!
      </Link>
    </div>
  );
};

export default Login;
