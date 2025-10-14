import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

const menu = [
  { title: "Inbox", icon: "fa-inbox", link: "/" },
  { title: "All Tasks", icon: "fa-circle-notch", link: "/all-tasks" },
];

function SideBar() {
  const [select, setSelect] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelect(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col justify-between gap-8 pt-4 px-6 pb-6 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 items-center">
          <img src="./logo.svg" alt="" className="h-[30px] w-[20px]" />
          <h1 className="font-bold text-xl">Task Flow</h1>
        </div>

        <ul className="flex flex-col gap-3">
          {menu.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 ${
                select === item.link
                  ? "bg-[#D1FAE5] text-[#065F46] font-semibold"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelect(item.link);
                navigate(item.link);
              }}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#14F3DC",
          borderRadius: "20px",
          padding: "10px 25px",
          color: "black",
          width: "200px",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#0DE4CC" },
        }}
        onClick={() => {
          navigate("/form");
        }}
      >
        New Task
      </Button>
    </div>
  );
}

export default SideBar;
