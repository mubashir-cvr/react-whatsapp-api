import React from "react";


function LoadingUserCard({index}) {
  return (
    <div
      key={index}
      className="flex w-full flex-row justify-betwee items-center border-2 p-4 animate-pulse bg-white h-24 shadow-md"
    >
      <div className="flex  h-full items-center justify-center">
        <div className="border-2 w-16 h-16 rounded-full">
       
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center h-full pl-2">
        <p className="flex h-full items-center text-pink-900 text-sm quantico-regular border-2 rounded-lg w-1/4  font-medium ">
        </p>
        <p className="flex h-full w-full text-xs items-center pl-1 border-2 rounded-lg quantico-regular ">
       
        </p>
        <p className="flex h-full text-xs items-start  border-2 rounded-lg w-3/4 ">
        </p>
      </div>
      <div className="flex p-4">
        <p className="hidden md:flex h-full w-full p-3 text-xs items-center  ">
          
        </p>
        <p className="md:hidden flex p-4"></p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:w-1/5 justify-center">
      <div className="flex   rounded-lg border-2 p-3"></div>
      <div className="flex   rounded-lg border-2 p-3"></div>
      </div>
    </div>
  );
}

export default LoadingUserCard;
