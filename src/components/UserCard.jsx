import React from "react";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { API_URL } from "../const/constants";

function UserCard({ handleEdit, handleDelete, user,updatePermission,deletePermission }) {
  
  return (
    <div className="flex-col border-2 p-4 bg-white h-32 shadow-md items-center justify-center">
      <div className="flex h-2">
        <p className="flex h-full w-full quantico-regular text-pink-900 justify-center text-xs font-medium items-center">
          {user.email}
        </p>
      </div>
      <div className="flex w-full flex-row justify-betwee items-center h-full">
        <div className="flex  h-full items-center justify-center">
          <div className="w-16 h-16  rounded-full">
            <img
              className="rounded-full border-2 border-pink-900 w-16 h-16"
              src={
                user.profilePicture
                  ? API_URL + user.profilePicture
                  : "https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
              }
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center h-full py-2 pl-2">
          <p className="flex h-full w-full  items-center text-pink-900 text-sm quantico-regular  font-medium pt-2">
            {user.name}
          </p>
          <p className="flex h-full w-full text-xs items-center pl-1 quantico-regular">
            {" "}
            {user.department || "NA"}
          </p>
          <p className="flex h-full w-full text-xs items-start">
            <span className="quantico-regular ">Role -</span>
            {user.role ? user.role.name : "NA"}
          </p>
        </div>
        <div className="flex p-4">
          <p className="hidden md:flex h-full w-full text-xs items-center pl-1">
            <MdOutlinePhoneIphone className="text-sm" />:{" "}
            {user.phoneNumber || "80xxxxxxxx"}
          </p>
          <p className="md:hidden flex p-4">
            <a href={`tel:+91${user.phoneNumber}`}>
              <BiSolidPhoneCall className="text-lg text-pink-900" />
            </a>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:w-1/5 justify-center">
          <button
            onClick={() => handleEdit(user._id)}
            disabled={!updatePermission}
            className=" text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(user._id)}
            disabled={!deletePermission}
            className="text-pink-900 border-2 p-2 text-xs rounded-lg"
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
