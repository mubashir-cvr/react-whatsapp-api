import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function StockCard({ handleEdit, handleDelete, stock }) {
  return (
    <div className="flex w-full min-h-16  shadow-md max-h-32 flex-row text-sm justify-between text-pink-900 px-2 gap-4 items-center border-2 bg-white ">
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">{stock.materialType}</p>
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">{stock.quantity}</p>
      <p className="flex w-1/4 border-r-2 h-full items-center px-4 justify-center">{stock.unit}</p>
      <p className="flex w-1/4 px-4 justify-center">{stock.as_on_date}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleEdit(stock)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(stock._id)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default StockCard;
