import React from "react";
import { NavLink } from "react-router-dom";
import { PiUserListFill } from "react-icons/pi";
import { TbLockAccess } from "react-icons/tb";
const itemClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center hover:bg-gray-100 border-r-2 flex-row gap-2";
const itemActiveClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center bg-gray-100  border-r-2 flex-row gap-2";
function UserLayout({ pageName, contentComponent }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-10 md:h-14 flex w-full flex-row items-center text-pink-900 bg-white border-b-2 sticky">
        <NavLink
          to="/users"
          className={pageName === "listUser" ? itemActiveClass : itemClass}
        >
          <span className="text-xl">
            <PiUserListFill />
          </span>
          <p className="text-s hidden md:flex">Users</p>
        </NavLink>
        {/* <NavLink
          to="/adduser"
          className={pageName === "addUser" ? itemActiveClass : itemClass}
        >
          Add User
        </NavLink> */}
        <NavLink
          to="/roles"
          className={pageName === "roles" ? itemActiveClass : itemClass}
        >
          <span className="text-xl">
            <TbLockAccess />
          </span>
          <p className="text-s hidden md:flex">Permissions</p>
        </NavLink>
      </div>
      <div className="flex flex-1 p-4 overflow-scroll flex-col gap-2 pb-14">
        {contentComponent}
      </div>
    </div>
  );
}

export default UserLayout;
