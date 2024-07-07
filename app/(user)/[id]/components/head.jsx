import React from "react";
import ProgressBar from "./ProgressBarSmall";
import { Calendar } from "react-feather";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Head({ Course }) {
  const [courseData, setCourseData] = useState([]);
  const { data: session } = useSession();

  const getProgress = async () => {
    const res = await fetch("api/getProgress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const data = await res.json();
    setCourseData(data.userCourses);
    console.log(courseData);
  };

  useEffect(() => {
    if (session) {
      console.log(session);
      getProgress();
    }
  }, [session]);

  console.log(Course);
  const name = Course?.name?.split("-")[0];
  const description = Course?.name?.split("-").slice(1);
  const progress = courseData.find(
    (course) => course.courseName === name
  )?.progress;

  return (
    <div className="w-full h-[25%] rounded-md p-8  bg-[#111111] border-[#21232b] border ">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row w-full h-[70%] rounded-xl justify-start">
          <img
            src={`/${Course?.name}.png`}
            className="object-cover rounded-xl w-[15%] h-full"
          />
          <div className="flex flex-col justify-around w-full h-full px-8">
            <h1 className="text-white text-3xl">{name}</h1>
            <h1 className="text-white">{description}</h1>
            <ProgressBar progress={progress} />
          </div>
        </div>
        <div className="w-full h-[30%] bg-[#111111] border-[#21232b] border-t-2 mt-5">
          <div className="flex flex-row items-center pt-2">
            <div className="w-10 h-full p-2 mt- rounded-full flex justify-center items-center bg-[#21232b]">
              <Calendar color="gray" />
            </div>
            <div className="flex flex-col pl-2">
              <h1 className="text-white text-sm">Start Date</h1>
              <h1 className="text-white text-sm">2021-22-22</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;
