import React from "react";

function ProgressBar({ progress }) {
  return (
    <>
      {" "}
      <div className="flex flex-col">
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            style={{ width: `${progress}%` }}
            className="h-full  text-white bg-blue-700 rounded-full"
          ></div>
        </div>
        <span className="text-x text-gray-500">{`${progress}% Completed`}</span>
      </div>
    </>
  );
}

export default ProgressBar;
