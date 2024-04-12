import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-white">
        <SideBar />
        <div className="flex flex-col flex-1 bg-gray-400">
          <Header />
          <div className="flex flex-1 justify-center items-center bg-gray-400 mt-14 pb-2 mb-8 md:mb-10">
            <Outlet />
          </div>
          <div className="flex fixed justify-center items-center bottom-0  w-full bg-white h-8 md:h-10">
            Footer
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
