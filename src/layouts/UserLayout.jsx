import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PiUserListFill } from "react-icons/pi";
import { TbLockAccess } from "react-icons/tb";
const itemClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center hover:bg-gray-100 flex-row gap-2";
const itemActiveClass =
  "flex h-10 md:h-12 items-center w-1/2 justify-center bg-gray-100  flex-row gap-2";
function UserLayout({ pageName, contentComponent }) {
  const [userObjectPermissions, setUserObjectPermission] = useState([]);
  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserObjectPermission(JSON.parse(userPermission).objects);
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      {(userObjectPermissions.some((permission) => permission == "Role") ||
        userObjectPermissions.some((permission) => permission == "All")) && (
        <div className="h-10 md:h-14 flex w-full flex-row items-center  text-pink-900 bg-white border-b-2">
          <NavLink
            to="/users"
            className={pageName === "listUser" ? itemActiveClass : itemClass}
          >
            <span className="text-xl">
              <PiUserListFill />
            </span>
            <p className="text-s hidden md:flex">Users</p>
          </NavLink>
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
      )}
      <div className="flex h-full overflow-scroll no-scrollbar flex-col gap-2 items-center">
        {contentComponent}
      </div>
    </div>
  );
}

export default UserLayout;
