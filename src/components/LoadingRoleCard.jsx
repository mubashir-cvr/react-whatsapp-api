import React from "react";

function RoleCard() {
  return (
    <div
      className="flex w-full min-h-16  animate-pulse  shadow-md max-h-32 flex-row text-xs justify-between text-pink-900 px-2 gap-4 items-center border-2 bg-white "
    >
      <p className="flex w-1/3 border-2 h-2 rounded-lg items-center px-4 justify-center"></p>
      <div className="flex w-1/3 px-4 border-2 h-2 rounded-lg  overflow-scroll items-center no-scrollbar justify-center">
      
      </div>
      <div className="flex gap-3 justify-center">
      <button
          
          className=" text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
       
        </button>
        <button
         
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          
        </button>
      </div>
    </div>
  );
}

export default RoleCard;
