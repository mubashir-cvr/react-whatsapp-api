import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Transition } from "react-transition-group";

// Define a duration for the animation

function StockTransactionCard({
  handleEdit,
  handleDelete,
  StockTransaction,
  updatePermission,
  deletePermission,
}) {
  return (
    <div className="flex text-xs animate-fade-in w-full min-h-10  shadow-md max-h-32 flex-row md:text-sm justify-between text-black-900  items-center border bg-white ">
      <p className="flex text-xs w-2/6 font-bold  md:w-1/6 border-r-2 h-full items-center justify-center">
        {new Date(StockTransaction.updated_at).toLocaleDateString([], {
          day: "numeric",
          month: "long",
        }) +
          "-" +
          new Date(StockTransaction.updated_at).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
      </p>
      <p className="flex w-2/6 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.item.item}
      </p>
      <p className="hidden md:flex w-2/6 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.item.item_type}
      </p>

      {StockTransaction.inOrOut === "IN" && (
        <p className="flex text-green-800 font-semibold w-1/6 md:w-1/6 border-r-2 h-full items-center justify-center">
          {" "}
          {StockTransaction.quantity}{" "}
        </p>
      )}
      {StockTransaction.inOrOut === "OUT" && (
        <p className="flex text-red-800 font-semibold w-1/6 md:w-1/6 border-r-2 h-full items-center justify-center">
          {" "}
          {StockTransaction.quantity}{" "}
        </p>
      )}

      <p className="flex w-2/6 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.transactionType}
      </p>
      {/* <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.packingType}
        
      </p> */}
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.updated_user.name}
      </p>

      {/* <p className="flex  md:w-1/6 px-4 justify-center">{stockItem.as_on_date}</p> */}
      <div className="hidden  md:flex w-1/6 flex-row md:w-1/6 items-center py-1 gap-1  md:gap-3 justify-center">
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

export default StockTransactionCard;
