import React from "react";
import { NavLink } from "react-router-dom";
const itemClass =
  "flex h-10 md:h-14 items-center w-1/3 justify-center hover:bg-gray-100 border-r-2";
const itemActiveClass =
  "flex h-10 md:h-14 items-center w-1/3 justify-center bg-gray-100  border-r-2";
function UserLayout({ pageName, contentComponent }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-10 md:h-14 flex w-full flex-row items-center bg-white border-b-2">
        <NavLink
          to="/users"
          className={pageName === "listUser" ? itemActiveClass : itemClass}
        >
          List User
        </NavLink>
        <NavLink
          to="/adduser"
          className={pageName === "addUser" ? itemActiveClass : itemClass}
        >
          Add User
        </NavLink>
        <NavLink
          to="/roles"
          className={pageName === "roles" ? itemActiveClass : itemClass}
        >
          Roles
        </NavLink>
      </div>
      <div className="flex flex-1 justify-center items-center">
        {contentComponent}
      </div>
    </div>
  );
}

export default UserLayout;
