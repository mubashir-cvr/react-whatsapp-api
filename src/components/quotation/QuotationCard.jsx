import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

function QuotationCard({
  handleEdit,
  handleDelete,
  quotation,
  deletePermission,
  updatePermission,
}) {
  return (
    <Link to={`/quotation/${quotation._id}`}>
    <div className="flex text-xs rounded-full w-full flex-row md:text-sm justify-between text-black-900 items-center h-full border bg-white hover:bg-slate-50">
      <p className="flex w-1/3 md:w-1/4 border-r-2 h-full items-center  justify-center">
        {quotation.qoutationNumber}
      </p>
      <div className="flex w-1/3 md:w-1/4 border-r-2 h-full items-center  justify-center">
        <div className="flex flex-col h-full w-full justify-center items-center">
          <p> {quotation.customer && quotation.customer.name}</p>
          <p> {quotation.customer && quotation.customer.phoneNumber}</p>
        </div>
      </div>
      <p className="hidden md:flex w-1/3 md:w-1/4 border-r-2 h-full items-center  justify-center">
      {new Date(quotation.updated_at).toLocaleDateString([], {
          day: "numeric",
          month: "long",
        }) +
          "-" +
          new Date(quotation.updated_at).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
      </p>
      <div className="flex py-1 w-1/3 md:w-1/4 h-full gap-3 justify-center">
        {updatePermission && (
          <button
            onClick={() => handleEdit(quotation)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <FaEdit />
          </button>
        )}

        {deletePermission && (
          <button
            onClick={() => handleDelete(quotation._id)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <MdDeleteForever />
          </button>
        )}
      </div>
    </div>
    </Link>
  );
}

export default QuotationCard;
