import React, { useState, useEffect } from "react";
import useActiveVideoStore from "@/store/ActiveVideoStore"; // adjust the path to match the location of your store
import { useSession } from "next-auth/react";

function Mainscreen({ courseId }) {
  const session = useSession()
  const userId = session?.data?.user?.id
  const [isVideoWatched, setIsVideoWatched] = useState(false)
  const videoLink = useActiveVideoStore((state) => state.videoLink);
  console.log({ videoLink });
  console.log(`https://drive.google.com/file/d/${videoLink}/preview`);
  console.log({ userId })

  useEffect(() => {
    fetch("api/isVideoWatched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, courseId, videoId: videoLink }),
    })
      .then(response => response.json())
      .then(data => setIsVideoWatched(data.watched))
  }, [userId, courseId, videoLink])

  console.log({ isVideoWatched })

  function toggleWatchStatus() {
    fetch("api/updateProgress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, courseId, videoId: videoLink, status: !isVideoWatched }),
    })
      .then(() => {
        setIsVideoWatched(prev => !prev)
      })
  }

  return (
    <div className="h-[97%] rounded-md mb-3 mt-4 w-[80%] bg-[#111111] border-[#21232b] border">
      <div className="relative w-full h-full flex justify-center items-center">
        {videoLink === "" ? (
          <h1 className="text-white text-3xl">Selct a topic form the course</h1>
        ) : (
          <>
            <div className="w-full h-full overflow-y-scroll">
              <iframe
                className="w-full h-full"
                src={`https://drive.google.com/file/d/${videoLink}/preview`}
                allow="autoplay"
                allowFullScreen
              ></iframe>
              <div className="px-4 py-2">
                <button className="bg-blue-600 text-white px-2 py-1 rounded-sm" onClick={toggleWatchStatus}>
                  {
                    isVideoWatched ? "Mark as Incomplete" : "Mark as Completed"
                  }
                </button>
              </div>
            </div>

            <div className="bg-white absolute right-2 top-3 w-12 h-12 flex flex-col justify-center items-center">
              CT
              <br />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Mainscreen;
