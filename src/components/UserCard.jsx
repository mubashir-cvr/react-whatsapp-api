import React from "react";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md"; 
import { API_URL } from "../const/constants";

function UserCard({ handleEdit, handleDelete, user, index }) {
  return (
    <div
      key={index}
      className="flex w-full flex-row justify-betwee items-center border-2 p-4 bg-white h-24 shadow-md"
    >
      <div className="flex  h-full items-center justify-center">
        <div className="border-2 w-16 h-16 rounded-full">
          <img
            className="rounded-full w-16"
            src={
              user.profilePicture
                ? API_URL + user.profilePicture
                : "https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x"
            }
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center h-full py-2 pl-2">
        <p className="flex h-full w-full items-center text-pink-900 text-sm quantico-regular  font-medium pt-2">
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
        <p className="md:hidden flex p-4"><a href={`tel:+91${user.phoneNumber}`}><BiSolidPhoneCall className="text-lg text-pink-900" /></a></p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:w-1/5 justify-center">
        <button
          onClick={() => handleEdit(user._id)}
          className=" text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
