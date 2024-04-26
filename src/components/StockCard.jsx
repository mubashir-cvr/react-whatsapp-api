import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function StockCard({ handleEdit, handleDelete, stock }) {
  return (
    <div className="flex w-full min-h-14  max-h-32 flex-row text-sm justify-between text-pink-900 px-2 gap-4 items-center border bg-white ">
      <p className="flex w-1/3 border-r-2 h-full items-center px-4 justify-center">{stock.item.item}</p>
      <p className="flex w-1/3 border-r-2 h-full items-center px-4 justify-center">{stock.quantity}</p>
      <div className="flex w-1/3 gap-3 justify-center">
        <button
        disabled
          onClick={() => handleEdit(stock)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
        disabled
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
