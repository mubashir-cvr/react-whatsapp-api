import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SiPrintables } from "react-icons/si";
import { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { VscBellDot } from "react-icons/vsc";
import { RiWallet3Line } from "react-icons/ri";
import { DASHBOARD_SIDEBAR, DASHBOARD_SIDEBAR_SEC } from "../routes/nav";
import { Link, NavLink } from "react-router-dom";
import { API_URL } from "../const/env_constant";

const itemClass = "flex gap-2 px-4 py-3 text-sm  border-b rounded-sm  hover:bg-gray-100";
const itemActiveClass = "flex gap-2 px-4 text-sm border-b rounded-sm py-3 bg-gray-100";
function Header() {
  const [isOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const sidebarRef = useRef();
  const [userObjectPermissions, setUserObjectPermission] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserObjectPermission(JSON.parse(userPermission).objects);

    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <div className="fixed top-15 bg-white md:h-18 flex phone-header flex-row md:right-0 md:left-64 items-center gap-3 border-b-2">
        <div className="md:hidden flex flex-row items-center w-full  h-14 gap-2 px-3 py-4">
          <div className="justify-start">
            <button onClick={() => setSidebarOpen(!isOpen)}>
              <GiHamburgerMenu className="text-2xl text-pink-900" />
            </button>
          </div>
          <div className="flex flex-1 gap-2 justify-center text-pink-900">
            <SiPrintables fontSize={24} />
            <p className="quantico-regular">PRESS MASTER</p>
          </div>
        </div>
        <div className="hidden md:flex px-4 flex-1">
          <h2 className="outfit-bold fo">
            Hi,{" "}
            <span className="font-light text-gray-600">
              {user && user.name}
            </span>
          </h2>
        </div>
        <div className="relative hidden md:flex">
          <HiOutlineSearch
            fontSize={26}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Search.."
            className="tet-sm focus:outline-none active:outline-none h-10 w-[25rem] border pl-11 border-gray-300 rounded-full px-4"
          />
        </div>
        <div className="flex md:px-4">
          <VscBellDot className="text-lg  text-pink-900" />
        </div>
        <div className="flex md:px-4">
          <RiWallet3Line className="text-lg text-pink-900" />
        </div>
        <Link to={"profile"}>
          {" "}
          <div className="flex p-2 image-container md:px-4">
            <img
              className="flex bg-white min-w-10 max-w-10 rounded-full min-h-10 max-h-10 border border-pink-900"
              src={
                user && user.profilePicture
                  ? API_URL + user.profilePicture
                  : "https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
              }
              alt="avatar"
            />
          </div>
        </Link>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Side bar  */}
      <div
        ref={sidebarRef}
        className={`fixed flex flex-col md:hidden border-x-2 shadow-gray-700 top-0 left-0 h-full bg-white z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 text-pink-900" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end w-full h-12 border-b-2 gap-2 px-3 py-4">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-1 gap-2 justify-center .">
              <SiPrintables fontSize={24} />
              <p className="quantico-regular">PRESS MASTER</p>
            </div>
            <button
              className="flex items-end"
              onClick={() => setSidebarOpen(!isOpen)}
            >
              <GiHamburgerMenu className="" />
            </button>
          </div>
        </div>
        <div className="overflow-auto no-scrollbar flex-1 flex flex-col">
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
              <DashBoadrdLink
                key={index}
                item={item}
                closeSidebar={closeSidebar}
              />
            ))}
          </div>
          
          <div className="gap-2 flex flex-col h-full justify-end">
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
              <DashBoadrdLink
                key={index}
                item={item}
                closeSidebar={closeSidebar}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

function DashBoadrdLink({ item, closeSidebar }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => (isActive ? itemActiveClass : itemClass)}
      onClick={closeSidebar}
    >
      <span className="text-lg">{item.icon}</span>
      <p className="text-sm text-black">{item.title}</p>
    </NavLink>
  );
}
