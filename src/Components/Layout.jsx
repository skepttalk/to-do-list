import React, { useContext } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import FormContext from "./FormCont";

const Layout = () => {
  const { theme } = useContext(FormContext);

  return (
    <div
      className={
        theme === "dark"
          ? "flex min-h-screen bg-gray-900 text-white"
          : "flex min-h-screen bg-gray-100 text-black"
      }
    >
      <div
        className={
          theme === "dark"
            ? "w-[260px] bg-gray-800 border-r border-gray-700"
            : "w-[260px] bg-white border-r border-gray-200"
        }
      >
        <SideBar />
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
