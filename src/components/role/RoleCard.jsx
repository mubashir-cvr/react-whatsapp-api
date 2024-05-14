import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md"; 
function RoleCard({ handleEdit, handleDelete, role,updatePermission,deletePermission }) {
  return (
    <div
      className="flex w-full  shadow-md max-h-32 flex-row text-xs justify-between text-black-900 items-center border bg-white"
    >
      <p className="flex w-1/3 border-r-2 h-full items-center justify-center">{role.name}</p>
      <div className="flex w-1/3  border-r-2  h-full overflow-scroll items-center no-scrollbar justify-center">
      {role.permissions.map(permission => permission.name).join(", ")} 
      </div>
      <div className="flex py-1 w-1/3 gap-2 justify-center">
      <button
          onClick={() => handleEdit(role)}
          disabled={!updatePermission}
          className=" text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(role._id)}
          disabled={!deletePermission}
          className="text-pink-900 border-2 p-2 text-xs rounded-lg"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default RoleCard;
