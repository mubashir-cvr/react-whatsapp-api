import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md"; 
function RoleCard({ handleEdit, handleDelete, role }) {
  return (
    <div
      className="flex w-full  shadow-md  flex-row text-xs justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-white  h-10"
    >
      <p className="flex w-1/3 border-r-2 px-4 justify-center">{role.name}</p>
      <div className="flex w-1/3 px-4 h-10 overflow-scroll p-2 no-scrollbar justify-center">
      {role.permissions.map(permission => permission.name).join(", ")} 
      </div>
      <div className="flex w-1/3 gap-3 justify-center">
      <button
          onClick={() => handleEdit(role)}
          className=" text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(role._id)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default RoleCard;
