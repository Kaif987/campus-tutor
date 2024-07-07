"use client";

import SideNavBar from "@/app/(user)/components/SideNavBar";

import { usePathname } from "next/navigation";

function PathNameNav() {
  const pathname = usePathname();
  if (pathname !== "/" && pathname !== "/dashboard") {
    return null;
  }
  return <SideNavBar />;
}

export default PathNameNav;
