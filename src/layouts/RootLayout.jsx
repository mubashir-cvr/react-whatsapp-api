import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-white">
        <SideBar />
        <div className="flex flex-col flex-1 bg-blue-300">
          <Header />
          <div className="flex flex-1 justify-center items-center bg-gray-400">
            <Outlet />
          </div>
          <div className="flex items-center justify-center bg-white h-14">
            Footer
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
