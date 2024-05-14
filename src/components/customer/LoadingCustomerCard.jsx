import React from "react";

function LoadingCustomer() {
  return (
    <div className="flex-col border p-4 animate-pulse  bg-white h-12 shadow-sm rounded-full  items-center justify-center">
      
      <div className="flex w-full opacity-55 flex-row  justify-center gap-1 md:gap-6 items-center h-full">
        <div className="flex h-full items-center ">
          <div className="flex h-full items-center rounded-full">
            <img
              className="rounded-full border-2  w-6 h-6"
              src="https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
            />
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <p className="flex h-full w-full  items-center text-pink-900 text-sm quantico-regular  font-medium">
           ..........
          </p>
       
        </div>
        
        <div className="flex ">
          <p className="flex h-full w-full text-xs items-center pl-1">
            ................
          </p>
        </div>

        <div className="flex h-full items-center justify-center">
          <p className="flex h-full w-full  items-center text-red-400 text-sm quantico-regular  font-medium">
            ..............
          </p>
       
        </div>
        <div className="flex flex-row gap-3 justify-center">
         ..................
        </div>
      </div>
    </div>
  );
}

export default LoadingCustomer;
