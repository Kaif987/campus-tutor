"use client";

import { Search, ChevronDown } from "react-feather";
import { React, useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import CategoryHeader from "./components/CategoryHeader";
import LearningProgress from "./components/LearningProgress";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="pl-8 pr-4 py-2 rounded-lg md:flex hidden bg-[#28292c] text-[#757575] focus:outline-none focus:border-blue-600"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Search className="absolute pl-2 text-gray-500" />
    </div>
  );
}

function UserDropdown({
  session,
  showDropdown,
  rotateChevron,
  handleDropdown,
  handleSignOut,
}) {
  return (
    <div className="relative">
      <div className="flex flex-row">
        {session ? (
          <h1 className="text-white font-bold text-2xl">
            {" "}
            {session.user.name}
          </h1>
        ) : (
          <Link href="/login">
            <button className="bg-white rounded-xl py-1 px-3 text-black">
              Sign In
            </button>
          </Link>
        )}
        {session && (
          <button
            className={`text-white text-xl ${showDropdown ? "open" : ""}`}
            onClick={handleDropdown}
          >
            <ChevronDown
              className={`h-5 w-5 inline-block ml-1 ${
                rotateChevron
                  ? "transform rotate-180 transition-all duration-300"
                  : "trasform transition-all duration-300"
              }`}
            />
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="absolute top-8 right-[1px]  w-32 bg-white shadow-lg rounded-lg p-2 transition-all duration-300 ease-in-out">
          <button className="text-red-500" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
//!COURSE LIST START -----------------------------------------------------------------------------------------------
function CourseList({
  CourseData,
  searchTerm,
  activeheader,
  setactive,
  setSearchTerm,
}) {
  const category = [
    { label: "All", searchTerm: "" },
    { label: "GeeksForGeeks", searchTerm: "geeksforgeeks" },
    { label: "Coding Ninjas", searchTerm: "codingninjas" },
    { label: "Mobile Development", searchTerm: "android" },
    { label: "DSA", searchTerm: "dsa" },
    { label: "Aptitude", searchTerm: "aptitude" },
    { label: "Web Development", searchTerm: "web" },
  ];

  useEffect(() => {
    if (activeheader) {
      const activeCategory = category.find((cat) => cat.label === activeheader);
      if (activeCategory) {
        setSearchTerm(activeCategory.searchTerm);
      }
    }

    if (searchTerm === "") {
      setactive("");
    }
  }, [activeheader]);

  if (!CourseData.files) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-white text-5xl">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="p-6 mr-8 overflow-x-scroll w-full h-full">
        {CourseData?.files
          ?.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((course, index) => {
            const [title, description] = course.name.split("-");
            const href = "/" + index;
            let imageSRC = "/" + course.name + ".png";
            switch (course.name) {
              case "Interview Preperation C++ -CodingNinjas":
                imageSRC = "/Interview Preperation Cpp-CodingNinjas.png";
                break;
              case "Introduction to C++ -CodingNinjas":
                imageSRC = "/Introduction to Cpp-CodingNinjas.png";
                break;
              case "DSA in C++":
                imageSRC = "/DSA in Cpp.png";
                break;
            }
            let tiles = description;
            console.log(tiles);

            return (
              <CourseCard
                tile={tiles}
                key={index}
                title={title}
                description={description}
                imageUrl={imageSRC}
                href={href}
              />
            );
          })}
      </div>
    );
  }
}
//!COURSE LIST END -----------------------------------------------------------------------------------------------

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rotateChevron, setRotateChevron] = useState(false);
  const [CourseData, setCourseData] = useState([]);
  const { data: session, status } = useSession();
  const [active, setActive] = useState("");

  const handleSearch = (event) => {
    console.log(session);
    setSearchTerm(event.target.value);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
    setRotateChevron(!rotateChevron);
  };

  const handleSignOut = () => {
    console.log(session.user.name);
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getfiles");
        const data = await response.json();
        console.log(data);
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-[#111111]">
      <div className="w-full h-20 border border-t-0 border-[#21232b] items-center flex">
        <div className="flex flex-row w-full items-center px-5 justify-between">
          <h1 className="text-3xl text-white">Courses</h1>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <UserDropdown
            session={session}
            showDropdown={showDropdown}
            rotateChevron={rotateChevron}
            handleDropdown={handleDropdown}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
      {/* ROW FIRST CONTAINING CATEGORY HEAD AND COURSE CARD */}
      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden ">
        <div className="md:w-[65%] w-full border-top-0 border h-full border-[#21232b]">
          <CategoryHeader active={active} setActive={setActive} />
          <CourseList
            CourseData={CourseData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeheader={active}
            setactive={setActive}
          />
        </div>
        {/* ROW SECOND CONTAINING OTHER ITEMS */}
        <div className="md:flex lg:flex hidden  w-[35%]  flex-col border border-l-0 border-t-0 border-[#21232b] ">
          <div className="flex  h-full justify-center   ">
            {session ? (
              <LearningProgress />
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <h1 className="px-10 text-center text-white text-5xl">
                  Please sign in to track your progress
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
