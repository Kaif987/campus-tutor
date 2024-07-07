import React, { useState, useEffect } from "react";
import "./style.css";
import getDemoData from "./demodata";
import { ArrowLeft, CheckCircle } from "react-feather";
import useActiveVideoStore from "@/store/ActiveVideoStore";
import Link from "next/link";

function BackButton() {
  return (
    <div className="flex flex-row border border-[#21232b] rounded-md p-4 m-4">
      <Link href="/" className="flex flex-row">
        <ArrowLeft color="grey" />
        <h1 className="px-2 text-[#757575]">Back to Dashboard</h1>
      </Link>
    </div>
  );
}

function Title({ name }) {
  return (
    <div className="border-b-2 rounded-md  border-[#21232b] ">
      <h1 className="text-white font-bold text-2xl pl-8 py-4">{name}</h1>
    </div>
  );
}

function ChapterSIdeNav(Course) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const setVideoLink = useActiveVideoStore((state) => state.setVideoLink);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickSUBITEM = (item) => {
    setSelectedItem(item);
    setVideoLink(item.id);
  };

  useEffect(() => {
    getDemoData(Course).then((data) => setMenuItems(data));
  }, [Course]);

  const handleSubMenuClick = (index) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };
  const name = Course?.Course?.name?.split("-")[0];

  return (
    <div className="flex flex-col h-[97%] rounded-md mb-3 mt-4 w-[20%] bg-[#111111] border-[#21232b] border">
      <BackButton />
      <Title name={name} />

      <div className="overflow-y-scroll">
        {menuItems.map((menuItem, index) => (
          <div key={index}>
            <div
              className="cursor-pointer py-2 px-4 text-white hover:bg-gray-700"
              onClick={() => handleSubMenuClick(index)}
            >
              {menuItem.title}
            </div>
            <div
              className={`submenu ${
                activeSubMenu === index ? "open" : ""
              } pl-8`}
            >
              {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                <div
                  key={subIndex}
                  onClick={() => handleClickSUBITEM(subMenuItem)}
                  className={`cursor-pointer py-2 px-4 text-white hover:bg- border-[#21232b] ${
                    subMenuItem === selectedItem ? "text-blue-500" : ""
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="mr-2">
                      <CheckCircle />
                    </div>
                    {subMenuItem.title.split(".")[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterSIdeNav;
