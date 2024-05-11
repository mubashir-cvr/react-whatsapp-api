import React from "react";

function LoadingStockCard() {
  return (
    <div className="flex w-full min-h-10 opacity-20 animate-pulse  shadow-md max-h-32 flex-row text-xs justify-between text-black-900 items-center border-2 bg-white ">
        <p className="flex w-2/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        .....
      </p>
      <p className="flex  w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
      .....
      </p>
      <p className="flex  w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
      .....
      </p>
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
      .....
      </p>
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
      .....
      </p>
      {/* <p className="flex  md:w-1/6 justify-center">{stockItem.as_on_date}</p> */}
      <div className="w-1/4 flex-row flex md:w-1/6 items-center py-1 gap-1  md:gap-3 justify-center">
      .....
      </div>
    </div>
  );
}

export default LoadingStockCard;
