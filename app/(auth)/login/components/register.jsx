"use client";

import "./style.css";
import { React, useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "react-feather"; // Import the Lock, Mail, Eye, and EyeOff icons from react-feather
import "../style.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loader from "./Loader";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add state for showing/hiding password
  const [errors, setErrors] = useState({}); // Add state for form errors
  const [showLoader, setShowLoader] = useState(false); // Add state for showing/hiding loader

  const router = useRouter();

  const validateForm = () => {
    let errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    if (validateForm()) {
      console.log("Valid");

      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        if (user) {
          console.log("User already exists.");
          setErrors({ email: "Email is already registered" });
          setShowLoader(false); // Set the loader to false if validation fails
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email,
            password,
          }),
        });

        if (res.ok) {
          await signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/",
          });
          setShowLoader(false); // Set the loader to false after successful registration

          router.push("/");
        } else {
          console.log("User registration failed.");
        }
      } catch (error) {
        setShowLoader(false); // Set the loader to false if an error occurs during registration
        console.log("Error during registration: ", error);
      }
    } else {
      setShowLoader(false); // Set the loader to false if validation fails
    }
  };

  return (
    <div className="w-full p-5 bg-[#111111] rounded-xl ">
      <div className="flex flex-col justify-center pt-4">
        <h1 className="text-4xl font-bold text-white">Register</h1>
        <p className="text-white">Create your account below.</p>
      </div>
      <div className="flex flex-col mt-2">
        <div className="w-full relative group">
          <User className="absolute mt-3 ml-2 text-white" />
          <input
            type="text"
            id="username"
            required
            className={`w-full px-10 py-2 mt-2 peer bg-[#28292c] border-gray-300 rounded-md focus:outline-none ${
              errors.username ? "border-red-500" : ""
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="username"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${
              username ? "top" : ""
            }`}
          >
            Username
          </label>
        </div>
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="w-full relative group">
          <Mail className="absolute mt-3 ml-2 text-white" />
          <input
            type="text"
            id="email"
            required
            className={`w-full px-10 py-2 mt-2 peer bg-[#28292c]  rounded-md focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${
              email ? "top" : ""
            }`}
          >
            Email
          </label>
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="w-full relative group">
          <Lock className="absolute mt-3 ml-2 text-white" />
          <input
            type={showPassword ? "text" : "password"} // Use conditional rendering to show/hide password
            id="password"
            required
            className={`w-full px-10 py-2 mt-2 bg-[#28292c] peer border-gray-300 rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : ""
            } ${password ? "filled" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${
              password ? "top" : ""
            }`}
          >
            Password
          </label>
          <button
            className="absolute  right-3 mt-3 text-white"
            onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="w-full relative group">
          <Lock className="absolute mt-3 ml-2 text-white" />
          <input
            type="password"
            id="confirmPassword"
            required
            className={`w-full px-10 py-2 mt-2 bg-[#28292c] peer border-gray-300 rounded-md focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : ""
            } ${confirmPassword ? "filled" : ""}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="confirmPassword"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${
              confirmPassword ? "top" : ""
            }`}
          >
            Confirm Password
          </label>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex flex-col mt-4 items-center bg-transparent">
        <button
          className="custom-button flex-1 w-1/2 font-bold text-xl bg-black text-white px-2 py-2.5 rounded-xl"
          onClick={handleSubmit}
        >
          {showLoader ? <Loader /> : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Register;
