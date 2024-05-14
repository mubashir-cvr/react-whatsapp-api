import React, { useState, useEffect } from "react";
import { SiPrintables } from "react-icons/si";
import { DASHBOARD_SIDEBAR, DASHBOARD_SIDEBAR_SEC } from "../routes/nav";
import { NavLink } from "react-router-dom";

const itemClass = "flex gap-3 px-8 py-4 text-pink-900 hover:bg-gray-100";
const itemActiveClass = "flex gap-3 px-8 py-4 bg-gray-100 text-pink-900";
function SideBar() {
  const [userObjectPermissions, setUserObjectPermission] = useState([]);
  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserObjectPermission(JSON.parse(userPermission).objects);
  }, []);

  return (
    <div className="hidden  fixed md:flex bottom-14 top-0 left-0 flex-col w-64 bg-white border-r-2">
      <div className="flex items-center border-b-2 h-16 gap-2 px-3 py-4 text-pink-900">
        <SiPrintables fontSize={24} />
        <p className="quantico-regular  border-l-2 px-3">PRESS MASTER</p>
      </div>
      <div className="overflow-scroll no-scrollbar flex-1  flex flex-col">
        <div className="gap-2 pb-3">
          {DASHBOARD_SIDEBAR.filter(
            (item) =>
              item.sidebar &&
              (userObjectPermissions.some(
                (permission) => permission === "All"
              ) ||
                userObjectPermissions.some(
                  (permission) => permission === item.object
                ) ||
                item.object === "")
          ).map((item, index) => (
            <DashBoadrdLink key={index} item={item} />
          ))}
        </div>

        <div className=""></div>
        <div className="flex flex-col  pb-3">
          <div className="flex justify-center py-2">
            <div className="size-px w-2/3 bg-pink-950 rounded-full opacity-50"></div>
          </div>
          {DASHBOARD_SIDEBAR_SEC.filter(
            (item) =>
              item.sidebar &&
              (userObjectPermissions.some(
                (permission) => permission === "All"
              ) ||
                userObjectPermissions.some(
                  (permission) => permission === item.object
                ) ||
                item.object === "")
          ).map((item, index) => (
            <DashBoadrdLink key={index} item={item} />
          ))}
        </div>
        <div>
            <DashBoadrdLink
              item={DASHBOARD_SIDEBAR_SEC.find((item) => item.to === "profile")}
            />
            <DashBoadrdLink
              item={DASHBOARD_SIDEBAR_SEC.find((item) => item.to === "logout")}
            />
          </div>
      </div>
    </div>
  );
}

export default SideBar;

function DashBoadrdLink({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (isActive ? itemActiveClass : itemClass)}
    >
      <span className="text-xl text-pink-900">{item.icon}</span>
      {item.title}
    </NavLink>
  );
}
