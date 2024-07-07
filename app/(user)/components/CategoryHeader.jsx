import React from "react";

function CategoryHeader({ setActive, active }) {
  const category = [
    "All",
    "GeeksForGeeks",
    "Coding Ninjas",
    "Mobile Development",
    "DSA",
    "Aptitude",
    "Web Development",
  ];

  return (
    <div className="scrollbar border h-14 border-[#21232b] border-t-0 md:flex hidden lg:flex overflow-y-scroll flex-row justify-between items-center">
      {category.map((item) => (
        <div className="px-4" key={item}>
          <button
            onClick={() => setActive(item)}
            className={`hover:text-blue-500 text-xs ${
              active === item ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {item}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryHeader;
