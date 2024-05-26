import React from 'react';

function PageLayout({ hCount, vCount }) {
  const itemWidth = 100 / hCount;
  const itemHeight = 100 / vCount;
  const verticalRows = Array.from({ length: vCount }).map((_, rowIndex) => (
    <div className='flex h-full w-full' key={`row-${rowIndex}`}>
      <div key={`row-${rowIndex}`} className={`flex flex-row h-[${itemHeight}%] w-full`}>
      {Array.from({ length: hCount }).map((_, colIndex) => (
        <div key={`row-${rowIndex}-col-${colIndex}`} className={`flex text-gray-500 overflow-hidden text-[8px] border items-center justify-center w-full h-full`} >
          A4
        </div>
      ))}
    </div>
    </div>
  ));

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col flex-1">
        {verticalRows}
      </div>
    </div>
  );
}

export default PageLayout;
