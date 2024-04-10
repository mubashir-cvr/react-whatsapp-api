import React from "react";
import { Link } from "react-router-dom";

function AddUser() {
  return (
<>
    <div className="flex flex-row w-full h-10 md:h-14 justify-between items-center">
        <Link to={"/users"}><div className="flex">List User</div></Link>
        <Link to={"/adduser"}><div className="flex">Add User</div></Link>
    </div> 
    <div>Add User</div>
    </>
  );
}

export default AddUser;
