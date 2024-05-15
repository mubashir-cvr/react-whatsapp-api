import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function QuotationItemCard({
  handleEdit,
  handleDelete,
  quotationItem,
  deletePermission,
  updatePermission,
}) {
  return (
    <div className="flex w-full flex-row text-sm justify-between text-black-900 items-center h-full border bg-white ">
      <p className="flex w-1/3 border-r-2 h-full items-center  justify-center">
        {quotationItem.name}
      </p>
      <p className="flex w-1/3 border-r-2 h-full items-center  justify-center">
        {quotationItem.dimention_length} {" X "}
        {quotationItem.dimention_breadth}{" "}
      </p>
      <div className="flex py-1 w-1/3 h-full gap-3 justify-center">
        {updatePermission && (
          <button
            onClick={() => handleEdit(quotationItem)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <FaEdit />
          </button>
        )}

        {deletePermission && (
          <button
            onClick={() => handleDelete(quotationItem._id)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <MdDeleteForever />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuotationItemCard;
