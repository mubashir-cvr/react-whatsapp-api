import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrDeliver } from "react-icons/gr";
import { NavLink } from "react-router-dom";
const itemClass = "flex h-14 justify-center hover:bg-gray-100 flex-row gap-2 w-1/3 h-full items-center text-xl text-pink-900";
const itemActiveClass = "flex h-14 justify-center bg-gray-100 flex-row gap-2 w-1/3 h-full items-center text-xl text-pink-900";
function FooterBar() {
  return (
    <div className="flex md:hidden flex-row h-full w-full items-center justify-between">
      <NavLink
        to="/test"
        className={({ isActive }) => (isActive ? itemActiveClass : itemClass)}
      >
        <FaRegUser />
      </NavLink>
      <NavLink
        to="/test1"
        className={({ isActive }) => (isActive ? itemActiveClass : itemClass)}
      >
        <LiaFileInvoiceDollarSolid />
      </NavLink>
      <NavLink
        to="/test2"
        className={({ isActive }) => (isActive ? itemActiveClass : itemClass)}
      >
        <GrDeliver />
      </NavLink>
    </div>
  );
}

export default FooterBar;
