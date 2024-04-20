import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import FooterBar from "./FooterBar";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-white">
        <SideBar />
        <div className="flex flex-col flex-1">
          <Header/>
          <div className="flex fixed border-2 left-0  right-0 md:left-64 top-0 bottom-0 flex-1 max-h-screen justify-center items-center bg-white mt-14  mb-14 md:mb-14">
            <Outlet />
          </div>
          <div className="flex fixed justify-center items-center bottom-0 border-2 w-full bg-white h-14 md:h-14">
          <FooterBar/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
