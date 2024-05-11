import React from "react";

function RoleCard() {
  return (
    <div
      className="flex w-full opacity-25 animate-pulse  shadow-md max-h-32 flex-row text-xs justify-between text-black-900  items-center border bg-white "
    >
     <p className="flex w-1/3 border-r-2 h-full items-center justify-center">  .......</p>
      <div className="flex w-1/3  border-r-2  h-full overflow-scroll items-center no-scrollbar justify-center">
     .......
      </div>
      <div className="flex py-2 w-1/3 gap-2 justify-center">
      .......
      </div>
    </div>
  );
}

export default RoleCard;
