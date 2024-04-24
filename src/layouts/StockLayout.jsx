import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
const itemClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center hover:bg-gray-100 flex-row gap-2";
const itemActiveClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center bg-gray-100  flex-row gap-2";
function StockLayout({ pageName, contentComponent }) {
  const [userObjectPermissions, setUserObjectPermission] = useState([]);
  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserObjectPermission(JSON.parse(userPermission).objects);
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      {(userObjectPermissions.some((permission) => permission == "StockItem") ||
        userObjectPermissions.some((permission) => permission == "All")) && (
        <div className="h-10 md:h-14 flex w-full flex-row items-center  text-pink-900 bg-white border-b-2">
          <NavLink
            to="/stocks"
            className={pageName === "stock" ? itemActiveClass : itemClass}
          >
            <span className="text-xl">
              <MdOutlinePlaylistPlay />
            </span>
            <p className="text-s hidden md:flex">Stocks</p>
          </NavLink>
          <NavLink
            to="/stocksitems"
            className={pageName === "stockItems" ? itemActiveClass : itemClass}
          >
            <span className="text-xl">
              <MdPlaylistAdd />
            </span>
            <p className="text-s hidden md:flex">Stock Items</p>
          </NavLink>
        </div>
      )}
      <div className="flex h-full p-4 overflow-scroll no-scrollbar flex-col gap-2 items-center">
        {contentComponent}
      </div>
    </div>
  );
}

export default StockLayout;
