"use client";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import Login from "./components/login";
import React, { useEffect, useState } from "react";
import "./style.css";
import { getSession } from "next-auth/react";
import Switch from "./components/switch";
import Register from "./components/register";
import { useQueryState } from "nuqs";
import { get } from "mongoose";

function LoginReg() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [ischecked, setIschecked] = useState(false);
  const [register, setRegister] = useQueryState("register");
  const [registerParam, setRegisterParam] = useState(
    searchParams.get("register")
  );

  useEffect(() => {
    const queryParams = searchParams.get("register");
    if (queryParams == "true") {
      setIschecked(true);
    } else {
      setIschecked(false);
    }
    console.log(queryParams);
  }, []);

  const handleInputChange = (event) => {
    if (event.target.checked) {
      setRegisterParam("true");
      setRegister(true);
      setIschecked(true);
      console.log("Input checkbox is checked");
    } else {
      setRegister(null);
      setRegisterParam(null);
      setIschecked(false);
      console.log("Input checkbox is not checked");
    }
  };
  return (
    <div className="flex flex-row">
      <div
        className={`sm:flex w-full h-screen hidden bg-black pattern-triangles-gray-500/40 ${ischecked ? "text-white" : "text-blue-700"
          }`}
      >
        <div className="flex flex-col justify-center items-center w-full ">
          <div className="">
            <h1 className="text-white animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-8xl font-bold">
              Campus Tutor
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-2/5 h-screen bg-black shadow-lg shadow-white">
        <div className="flex flex-col items-center justify-center  h-full p-10">
          <div className="flex flex-row justify-between w-full items-center p-1 px-4">
            <h1
              className={`text-xl pr-2 ${ischecked ? "text-white" : "text-blue-700"
                }`}
            >
              Login
            </h1>
            <Switch handleInputChange={handleInputChange} check={ischecked} />
            <h1
              className={`text-xl pl-2 ${ischecked ? "text-blue-700" : "text-white"
                }`}
            >
              Register
            </h1>
          </div>
          {registerParam === "true" ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
}

export default LoginReg;
