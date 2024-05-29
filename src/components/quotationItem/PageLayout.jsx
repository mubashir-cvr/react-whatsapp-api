import React, { useEffect, useState } from "react";

const PageLayout = ({
  printLayout,
  copySize,
  orientation,
  rows,
  columns,
  paperSize,
  width,
}) => {
  const [rowPapers, setRowPapers] = useState(null);

  useEffect(() => {
    renderSmallPapers();
    console.log(rowPapers);
  }, []);
  const { length: printAreaLength, breadth: printAreaBreadth } = printLayout;
  const { length: copyLength, breadth: copyBreadth } = copySize;
  const { length: actualPageLength, breadth: actualPageBreadth } = paperSize;

  let paperCount = 0;
  const pageLayoutbreadth = width;
  const pageLayoutToPageSizeRatio = pageLayoutbreadth / actualPageBreadth;
  const printLayoutBreadth = printAreaBreadth * pageLayoutToPageSizeRatio;
  const smallPapersCount =
    orientation === "vertical"
      ? Math.floor(printAreaLength / copyLength) *
        Math.floor(printAreaBreadth / copyBreadth)
      : Math.floor(printAreaLength / copyBreadth) *
        Math.floor(printAreaBreadth / copyLength);

  const smallPaperStyle =
    orientation === "vertical"
      ? {
          width: `${(copyBreadth / printAreaBreadth) * 100}%`,
        }
      : {
          width: `${(copyLength / printAreaBreadth) * 100}%`,
        };
  const rowStyle =
    orientation === "vertical"
      ? {
          height: `${(copyLength / printAreaLength) * 100}%`,
        }
      : {
          height: `${(copyBreadth / printAreaLength) * 100}%`,
        };

  const renderSmallPapers = () => {
    let paperCols = [];
    let papersRows = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        paperCols.push(1);
      }
      papersRows.push(paperCols);
      paperCols = [];
    }

    setRowPapers(papersRows);
  };

  return (
    <div
      className="flex flex-col"
      // style={{
      //   width: `${pageLayoutbreadth}px`,
      // }}
    >
      <div className="flex flex-row w-full h-4">
        <div className="flex w-4  h-full"></div>
        <div
          className="flex h-full justify-center items-center  text-green-600 text-xs border-b border-dashed border-green-600"
          style={{ width: `${printLayoutBreadth}px` }}
        >
          {printLayout.breadth}
        </div>
        <div className="flex flex-1 h-full border-dashed items-center justify-center text-xs  text-red-600 border-b border-red-600">
        {printLayout.breadthWaste > 0 ? printLayout.breadthWaste : ""}
        </div>
      </div>

      <div
        className="flex flex-row"
        style={{
          height: `${actualPageLength * pageLayoutToPageSizeRatio}px`,
        }}
      >
        <div className="flex flex-col  w-4 h-full">
          <div
            className="flex w-full text-green-600  items-center justify-center text-xs border-r border-dashed border-green-600"
            style={{
              height: `${printAreaLength * pageLayoutToPageSizeRatio}px`,
            }}
          >
            {printLayout.length}
          </div>

          <div className="flex w-full flex-1 border-dashed items-center justify-center text-xs  text-red-600 border-r border-red-600">
            {printLayout.lengthWaste > 0 ? printLayout.lengthWaste : ""}
          </div>
        </div>
        <div
          className="flex bg-transparent flex-col border bg-red-100 justify-start items-start w-full h-full"
          style={{
            width: `${pageLayoutbreadth}px`,
            height: `${actualPageLength * pageLayoutToPageSizeRatio}px`,
            backgroundImage: `linear-gradient(to right, rgb(255, 230, 230) 50%, transparent 50%), linear-gradient(to bottom, rgb(255, 230, 230) 50%, transparent 50%)`,
            backgroundSize: "2px 2px",
          }}
        >
          <div
            className="relative border bg-emerald-50 border-gray"
            style={{
              width: `${printLayoutBreadth}px`,
              height: `${printAreaLength * pageLayoutToPageSizeRatio}px`,
            }}
          >
            {rowPapers &&
              rowPapers.map((paper, index) => {
                return (
                  <div
                    key={index}
                    className="flex text-xs flex-row text-gray-600"
                    style={rowStyle}
                  >
                    {paper.map((count, innerIndex) => {
                      paperCount++;
                      return (
                        <div
                          key={innerIndex + index}
                          className="flex border items-center justify-center"
                          style={smallPaperStyle}
                        >
                          {paperCount}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
