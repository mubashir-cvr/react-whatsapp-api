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
    <div className="flex p-2 w-full min-h-16  shadow-md max-h-32 flex-row text-sm justify-between text-pink-900 px-2 gap-4 items-center border-2 bg-white ">
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">
        {stockItem.item}
      </p>
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">
        {stockItem.item_type}
      </p>
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">
        {stockItem.gsm}
      </p>
      <p className="hidden md:flex w-1/4 border-r-2 h-full items-center px-4 justify-center">
        {stockItem.dimention_length}
        {" X "}
        {stockItem.dimention_breadth}
      </p>
      <p className="hidden md:flex w-1/4 border-r-2 h-full items-center px-4 justify-center">
        {stockItem.unit_of_measurement}
      </p>
      {/* <p className="flex w-1/4 px-4 justify-center">{stockItem.as_on_date}</p> */}
      <div className="flex-col md:flex-row flex w-full md:w-1/4 items-center   gap-3 justify-center">
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
