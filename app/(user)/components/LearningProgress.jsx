import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function ProgressBar() {
  const { data: session } = useSession();
  const [progressData, setProgressData] = useState([]);

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
    setProgressData(data.userCourses);
    console.log(data.userCourses[0].progress);
  };

  useEffect(() => {
    if (session) {
      console.log(session);
      getProgress();
    }
  }, [session]);

  const materialColors = [
    {
      from: "#f44336",
      to: "#e91e63",
    },
    {
      from: "#9c27b0",
      to: "#673ab7",
    },
    {
      from: "#3f51b5",
      to: "#2196f3",
    },
    {
      from: "#03a9f4",
      to: "#00bcd4",
    },
    {
      from: "#009688",
      to: "#4caf50",
    },
  ];

  return (
    <div className=" main-div rounded-xl m-12 w-full bg-[#1e1f22] p-5 h-fit">
      <h1 className="text-white text-4xl">Learning Progress</h1>
      {progressData.map((progress, index) => {
        const randomColor = materialColors[index % materialColors.length];

        return (
          <div key={index}>
            <div className="flex pt-8 pb-2 px-1 flex-row justify-between w-full">
              <h1 className="text-white">{progress.courseName}</h1>
              <h1 className="text-white">{progress.progress}%</h1>
            </div>
            <div
              key={index}
              className="progress-bar w-full h-10 bg-[#27282c] pattern-diagonal-stripes-gray-500/100 rounded-lg shadow-xl"
            >
              <div
                className="progress rounded-lg h-10 bg-gradient-to-r "
                style={{
                  backgroundImage: `linear-gradient(to right, ${randomColor.from}, ${randomColor.to})`,
                  width: `${Math.min(progress.progress, 100)}%`,
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
