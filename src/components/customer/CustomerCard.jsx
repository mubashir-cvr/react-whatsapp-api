import React from "react";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API_URL } from "../../const/env_constant";
import { IoIosArrowRoundDown } from "react-icons/io";
function CustomerCard({ handleEdit, handleDelete, customer,updatePermission,deletePermission }) {
  
  return (
    <div className="flex-col animate-fade-in  border p-4 bg-white h-12 shadow-sm rounded-full  items-center justify-center">
      
      <div className="flex w-full flex-row  justify-center gap-1 md:gap-6 items-center h-full">
        <div className="flex h-full items-center ">
          <div className="flex h-full items-center rounded-full">
            <img
              className="rounded-full border-2 w-6 h-6"
              src={
                customer.profilePicture
                  ? API_URL + customer.profilePicture
                  : "https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
              }
            />
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <p className="flex h-full w-full  items-center text-pink-900 text-sm quantico-regular  font-medium">
            {customer.name}
          </p>
       
        </div>
        
        <div className="flex ">
          <p className="flex h-full w-full text-xs items-center pl-1">
            <MdOutlinePhoneIphone className="text-sm" />:{" "}
            <a href={`tel:+91${customer.phoneNumber}`}>{customer.phoneNumber || "80xxxxxxxx"}</a>
          </p>
        </div>

        <div className="flex h-full items-center justify-center">
          <p className="flex h-full w-full  items-center text-red-400 text-sm quantico-regular  font-medium">
            10000 ₹ <IoIosArrowRoundDown />
          </p>
       
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <button
            onClick={() => handleEdit(customer)}
            disabled={!updatePermission}
            className=" text-pink-900 text-md rounded-lg"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(customer)}
            disabled={!deletePermission}
            className="text-pink-900 text-md rounded-lg"
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
