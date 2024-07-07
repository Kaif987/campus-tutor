"use client";

import { notFound } from "next/navigation";
import Head from "./components/head";
import { useEffect, useState } from "react";
import ChapterSIdeNav from "./components/ChapterSIdeNav";
import Mainscreen from "./components/Mainscreen";

function CourseDashboard({ params }) {
  const [dataIndex, setDataIndex] = useState([null]);
  const [datadone, setDatadone] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getfiles");
        const data = await response.json();
        console.log(data.files[params.id]);
        setDatadone(true);
        return setDataIndex(data.files[params.id]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (params.id < 0 || params.id > 18) {
    return notFound();
  } else {
    return (
      <div>
        {datadone ? (
          <div className="w-screen h-screen bg-black p-4">
            <div className="flex flex-col w-full h-full">
              <Head Course={dataIndex} />
              <div
                className="flex w-full h-full overflow-hidden
               flex-row"
              >
                <Mainscreen Course={dataIndex} courseId={"/" + params.id} />
                <div className="h-fit w-[0.8%]" />
                <ChapterSIdeNav Course={dataIndex} />
              </div>
            </div>
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }
}

export default CourseDashboard;
