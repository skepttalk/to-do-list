// src/Components/Layout.jsx
import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-[260px] h-screen border-r border-gray-200 bg-white sticky top-0">
        <SideBar />
      </div>
      <div className="flex-1 bg-[#F9FAFB] p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
