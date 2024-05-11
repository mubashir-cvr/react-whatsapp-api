import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function StockTransactionCard({
  handleEdit,
  handleDelete,
  StockTransaction,
  updatePermission,
  deletePermission,
}) {
  return (
    <div className="flex text-xs  w-full min-h-10  shadow-md max-h-32 flex-row md:text-sm justify-between text-black-900 px-2 gap-4 items-center border bg-white ">
      <p className="flex w-2/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.item.item}
      </p>
      <p className="flex w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.item.item_type}
      </p>
      <p className="flex  w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.quantity}
      </p>
     
        {StockTransaction.inOrOut ==="IN" && <p className="flex text-green-500 font-medium w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">Stock Purchase  </p>}
        {StockTransaction.inOrOut ==="OUT" && <p className="flex text-red-500 font-medium w-1/4 md:w-1/6 border-r-2 h-full items-center justify-center">Stock Out  </p>}
    
      {/* <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.packingType}
        
      </p> */}
      <p className="hidden md:flex  md:w-1/6 border-r-2 h-full items-center justify-center">
        {StockTransaction.updated_user.name}
      </p>
      <p className="hidden md:flex text-xs  md:w-1/6 border-r-2 h-full items-center justify-center">
        {new Date(StockTransaction.updated_at).toLocaleDateString([],{day:'numeric',month:'long'}) +"-"+ new Date(StockTransaction.updated_at).toLocaleTimeString([],{hour:'numeric',minute:'numeric',hour12:true})}
      </p>
      {/* <p className="flex  md:w-1/6 px-4 justify-center">{stockItem.as_on_date}</p> */}
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

export default StockTransactionCard;
