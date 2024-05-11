import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

function StockCard({ handleEdit, handleDelete, stock }) {
  const itemId=btoa(stock.item._id)
  return (
    <Link to={`/stockhistory/${itemId}`}>
    <div className="flex w-full  hover:bg-gray-50 hover:cursor-pointer flex-row text-sm justify-between text-black-900 items-center h-full border bg-white ">
      <p className="flex w-1/3 border-r-2 h-full items-center  justify-center">{stock.item.item}</p>
      <p className="flex w-1/3 border-r-2 h-full items-center  justify-center">{stock.quantity}</p>
      <div className="flex py-1 w-1/3 h-full gap-3 justify-center">
        <button
        disabled
          onClick={() => handleEdit(stock)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
      </div>
    </div>
    </Link>
  );
}

export default StockCard;
