import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function PrinterCard({
  handleEdit,
  handleDelete,
  printer,
  deletePermission,
  updatePermission,
}) {
  return (
    <div className="flex w-full flex-row text-sm justify-between text-black-900 items-center h-full border bg-white ">
      <p className="flex w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.name}
      </p>
      <p className="flex w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.maxLength} {" X "}
        {printer.maxBreadth}{" "}
      </p>
      <p className="flex w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.minimumCharge} {" until "} {printer.maxCountPrintPerMinCharge} {" print"}
      </p>
      <p className="flex w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.extraChargePerSet} 
      </p>
      <p className="flex w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.minChargeCutOffCount} 
      </p>
      <div className="flex py-1 w-1/6 h-full gap-3 justify-center">
        {updatePermission && (
          <button
            onClick={() => handleEdit(printer)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <FaEdit />
          </button>
        )}

        {deletePermission && (
          <button
            onClick={() => handleDelete(printer._id)}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <MdDeleteForever />
          </button>
        )}
      </div>
    </div>
  );
}

export default PrinterCard;
