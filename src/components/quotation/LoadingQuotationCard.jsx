import React from "react";

function LoadingQuotationCard() {
  return (
    <div className="flex w-full min-h-10 opacity-20 animate-pulse  shadow-md max-h-32 flex-row text-xs justify-between text-black-900 items-center border-2 bg-white ">
        <p className="flex w-1/3 border-r-2 h-full items-center justify-center">
        .....
      </p>
      <p className="flex  w-1/3 border-r-2 h-full items-center justify-center">
      .....
      </p>
      <p className="flex  w-1/3 border-r-2 h-full items-center justify-center">
      .....
      </p>
     
    </div>
  );
}

export default LoadingQuotationCard;
