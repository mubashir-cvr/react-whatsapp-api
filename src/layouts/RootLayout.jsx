import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function RootLayout() {
  return (
    <div className="flex flex-col h-screen w-screen border-2">
      <div className="flex flex-1 flex-row h-full bg-white border-2">
          <SideBar />
        <div className="flex flex-1">
          <div className="flex flex-col bg-blue-300 w-full h-full">
            <div className="flex h-16 w-full bg-white"><Header/></div>
            <div className="flex flex-1 justify-center items-center h-full w-full bg-gray-400">
              <Outlet />
            </div>
            <div className="flex items-center bg-green-400 justify-center h-14">
              Footer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
