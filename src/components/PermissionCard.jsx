import React from 'react'
import { MdDeleteForever } from "react-icons/md";

function PermissionCard({index,permission,handleDelete}) {
  return (
    <div
            key={index}
            className="flex w-full flex-row text-xs justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-white shadow-md h-10"
          >
            <p className="flex w-1/5 border-r-2 px-4 justify-center">
              {permission.name ? permission.name : "N/A"}
            </p>
            <p className="flex w-2/5 border-r-2 px-4 justify-center">
              {permission.description ? permission.description : "N/A"}
            </p>
            <p className="flex w-1/5 justify-center">
              {permission.objectname ? permission.objectname : "All"}
            </p>
            <div className="flex w-1/5 justify-center">
            <button
          onClick={() => handleDelete(permission._id)}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
            </div>
          </div>
  )
}

export default PermissionCard