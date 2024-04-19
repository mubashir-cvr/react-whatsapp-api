import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SiPrintables } from "react-icons/si";
import { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { VscBellDot } from "react-icons/vsc";
import { RiWallet3Line } from "react-icons/ri";
import { DASHBOARD_SIDEBAR, DASHBOARD_SIDEBAR_SEC } from "../routes/nav";
import { NavLink } from "react-router-dom";
import { API_URL } from "../const/constants";
const itemClass = "flex gap-3 px-8 py-4 hover:bg-gray-100";
const itemActiveClass = "flex gap-3 px-8 py-4 bg-gray-100";
function Header({ user }) {
  const [isOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const sidebarRef = useRef();

  useEffect(() => {
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
              <GiHamburgerMenu />
            </button>
          </div>
          <div className="flex flex-1 gap-2 justify-center text-pink-900">
            <SiPrintables fontSize={24} />
            <p className="quantico-regular">PRESS MASTER</p>
          </div>
        </div>
        <div className="hidden md:flex px-4 flex-1">
          <h2 className="outfit-bold fo">
            Hi, <span className="font-light text-gray-600">{user.name}</span>
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
        <div className="flex p-2 md:px-4">
          <img
            className="flex bg-white w-10 rounded-full h-10 border-2"
            src={
              user.profilePicture
                ? API_URL + user.profilePicture
                : "https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
            }
            alt="avatar"
          />
        </div>
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
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className="overflow-auto no-scrollbar flex-1 flex flex-col">
          <div className="gap-2 flex-1 pb-3">
            {DASHBOARD_SIDEBAR.filter((item) => item.sidebar).map(
              (item, index) => (
                <DashBoadrdLink
                  key={index}
                  item={item}
                  closeSidebar={closeSidebar}
                />
              )
            )}
          </div>
          <div className="flex justify-center py-2">
            <div className="size-px w-2/3 bg-pink-950 rounded-full opacity-50"></div>
          </div>
          <div className="gap-2 mb-10">
            {DASHBOARD_SIDEBAR_SEC.filter((item) => item.sidebar).map(
              (item, index) => (
                <DashBoadrdLink
                  key={index}
                  item={item}
                  closeSidebar={closeSidebar}
                />
              )
            )}
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
      <span className="text-xl">{item.icon}</span>
      <p className="text-s">{item.title}</p>
    </NavLink>
  );
}
