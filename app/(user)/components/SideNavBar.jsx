"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "antd";

import {
  HomeOutlined,
  DashboardOutlined,
  BookOutlined,
  StarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";

const menuItems = [
  {
    title: "Home",
    icon: <HomeOutlined />,
    path: "/",
  },
  {
    title: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
  },
  {
    title: "Bookmarks",
    icon: <StarOutlined />,
    path: "/books",
  },
];

function SideNavBar() {
  const pathname = usePathname();

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.path === pathname),
    [pathname]
  );

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    // Perform logout action here
    console.log("logout");
    setShowLogoutConfirmation(false);
    signOut();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const { data: session } = useSession();

  const isLoggedIn = session; // Replace this with your actual login state

  return (
    <div className={`h-[100%] bg-black flex flex-col justify-between md:px-10 px-0`} >
      <div className="flex flex-col items-center">
        <div className="my-4 mt-5 mb-10">
          {/* logo here */}
          <h1 className="text-white md:text-3xl text-sm text-center">
            Campus Tutor
          </h1>
        </div>
        {menuItems.map((item) => (
          <div
            key={item.title}
            className={`flex flex-row items-center md:w-36 w-16 pt-6 md:pl-0 pl-3 transition-colors duration-300 ${activeMenu === item ? "text-white" : "text-[#757575] "
              }`}
          >
            <Link
              href={item.path}
              passHref
              className="flex flex-row items-center"
            >
              {activeMenu === item ? (
                <div className="w-[2px] h-5 bg-blue-700 mr-4 rounded-lg"></div>
              ) : null}
              <div
                className={`mr-3 flex items-center justify-center ${activeMenu === item ? "text-white" : "text-[#75757]"
                  } transition-all duration-300`}
              >
                {item.icon}
              </div>
              <div
                className={`text-xl flex items-center justify-center ${activeMenu === item ? "text-white" : "text-[#757575]"
                  } transition-all duration-300 ${"hidden md:flex"}`}
              >
                {item.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* MOBILE logout button here */}
      {isLoggedIn && (
        <button
          className="text-white flex justify-center mb-5 md:hidden"
          onClick={handleLogout}
        >
          <LogoutOutlined />
        </button>
      )}

      <div className=" mb-4 justify-center items-center flex-col md:flex hidden ">
        {/* Add your logout button here */}
        <div className="w-44 mb-2  h-[1px] bg-[#757575] transition-all duration-300"></div>

        {isLoggedIn && (
          <button
            className="flex items-center p-2 text-[#757575] hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            <LogoutOutlined className="mr-2" />
            Logout
          </button>
        )}
      </div>

      {/* Logout confirmation modal */}
      <Modal
        open={showLogoutConfirmation}
        onCancel={handleCancelLogout}
        onOk={handleConfirmLogout}
        centered
        closable={false}
        maskClosable={false}
        okText={<span>Logout</span>}
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default SideNavBar;
