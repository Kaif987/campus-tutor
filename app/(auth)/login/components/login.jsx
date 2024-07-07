"use client";
import { React, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock } from "react-feather"; // Import the Lock icon from react-feather
import { signIn } from "next-auth/react";
import Link from "next/link";
import "../style.css";
import Loader from "./Loader";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoader, setShowLoader] = useState(false); // Add state for showing/hiding loader

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      if (!username) {
        setUsernameError("Please enter a username");
      } else {
        setUsernameError("");
      }
      if (!password) {
        setPasswordError("Please enter a password");
      } else {
        setPasswordError("");
      }
    } else {
      setUsernameError("");
      setPasswordError("");
      try {
        setShowLoader(true); // Show loader
        const res = await signIn("credentials", {
          email: username,
          password,
          redirect: false,
        });

        if (res.error) {
          setPasswordError("Incorrect Username or Password");
          setShowLoader(false); // Hide loader
          return;
        }

        console.log(res);
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoader(false); // Hide loader
      }
    }
  };

  return (
    <div className="w-full p-5 bg-[#111111] rounded-xl">
      <div className="flex flex-col justify-center pt-4">
        <h1 className="text-4xl font-bold text-white">Login</h1>
        <p className="text-white">Enter your credentials below.</p>
      </div>
      <div className="flex flex-col mt-1">
        <div className="w-full relative group mt-2">
          <User className="absolute mt-3 ml-2 text-white" />
          <input
            type="text"
            id="username"
            required
            className="w-full px-10 py-2 mt-2 peer bg-[#28292c] border-gray-300 rounded-md focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="username"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${username ? "top" : ""
              }`}
          >
            Email
          </label>
        </div>
        {usernameError && (
          <p className="text-red-500 text-xs mt-1">{usernameError}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="w-full relative group">
          <Lock className="absolute mt-3 ml-2 text-white" />
          <input
            type="password"
            id="password"
            required
            className={`w-full px-10 py-2 mt-2 bg-[#28292c] peer border-gray-300 rounded-md focus:outline-none ${password ? "filled" : ""
              }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className={`transform transition-all absolute top-1 left-0 h-full flex items-center pl-14 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ${password ? "top" : ""
              }`}
          >
            Password
          </label>
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
      </div>
      <div className="text-blue-500 text-sm mt-3"><Link href="/forgot">Forgot Password ? </Link></div>
      <div className="flex flex-col mt-4 items-center">
        <button
          className="flex-1  w-1/2 font-bold text-xl bg-black  px-2 py-2.5 rounded-xl text-white "
          onClick={handleLogin}
        >
          {showLoader ? <Loader /> : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
