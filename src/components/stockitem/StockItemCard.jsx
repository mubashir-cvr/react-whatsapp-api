import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function StockItemCard({
  handleEdit,
  handleDelete,
  stockItem,
  updatePermission,
  deletePermission,
}) {
  return (
    <div className="flex text-xs  w-full shadow-md max-h-32 flex-row md:text-sm justify-between text-black items-center border bg-white ">
      <p className="flex w-2/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {stockItem.item}
      </p>
      <p className="flex  w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {stockItem.item_type}
      </p>
      <p className="flex  w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {stockItem.gsm}
      </p>
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {stockItem.dimention_length}
        {" X "}
        {stockItem.dimention_breadth}
      </p>
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {stockItem.unit_of_measurement}
      </p>
      {/* <p className="flex  md:w-1/6 justify-center">{stockItem.as_on_date}</p> */}
      <div className="w-1/4 flex-row flex md:w-1/6 items-center py-1 gap-1  md:gap-3 justify-center">
        <button
          disabled={!updatePermission}
          onClick={() => handleEdit(stockItem)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
          disabled={!deletePermission}
          onClick={() => handleDelete(stockItem._id)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default StockItemCard;
