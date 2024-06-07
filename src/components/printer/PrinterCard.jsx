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
    <div className="flex w-full flex-row text-xs md:text-sm justify-between text-black-900 items-center h-full border bg-white ">
      <p className="flex w-1/3 md:w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.name}
      </p>
      <p className="hidden md:flex w-1/4 md:w-1/6 border-r-2 h-full items-center  justify-center">
        {printer.maxLength} {" X "}
        {printer.maxBreadth}{" "}
      </p>
      <p className="flex w-1/3 flex-col justify-between items-center md:w-1/6 border-r-2 h-full">
        {printer.charges.map((charge)=>{
          return <div className="flex w-full border-b items-center justify-center text-xs">{charge.colour} {"/"} {charge.plateCharge} {"₹"}</div>
        })}
      </p>
      <p className="hidden md:flex w-1/4 flex-col justify-between items-center md:w-1/6 border-r-2 h-full">
        {printer.charges.map((charge)=>{
          return <div className="flex w-full border-b items-center justify-center text-xs">{charge.minimumCharge}{"₹/"}{charge.minimumCharge} {"Print"}</div>
        })}
      </p>
      <p className="hidden md:flex w-1/4 flex-col justify-between items-center md:w-1/6 border-r-2 h-full">
        {printer.charges.map((charge)=>{
          return <div className="flex w-full border-b items-center justify-center text-xs">{charge.extraChargePerSet}</div>
        })}
      </p>
      <p className="hidden md:flex w-1/4 flex-col justify-between items-center md:w-1/6 border-r-2 h-full">
        {printer.charges.map((charge)=>{
          return <div className="flex w-full border-b items-center justify-center text-xs">{charge.minChargeCutOffCount}</div>
        })}
      </p>
      <div className="flex px-1 py-1 w-1/3 md:w-1/6 h-full gap-1 items-center justify-center">
        {updatePermission && (
          <button
            onClick={() => handleEdit(printer)}
            className="text-pink-900 border-2 max-h-8 items-center p-1 md:p-2 text-xs rounded-lg"
          >
            <FaEdit />
          </button>
        )}

        {deletePermission && (
          <button
            onClick={() => handleDelete(printer._id)}
            className="text-pink-900 border-2 p-1 max-h-8 items-center md:p-2 text-xs rounded-lg"
          >
            <MdDeleteForever />
          </button>
        )}
      </div>
    </div>
  );
}

export default PrinterCard;
