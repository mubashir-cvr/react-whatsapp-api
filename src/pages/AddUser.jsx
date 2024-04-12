import React from "react";
import { Link } from "react-router-dom";

function AddUser() {
  return (
<div className="flex flex-col h-full w-full">
    <div className="flex flex-row w-full h-10 md:h-14 justify-between items-center">
        <Link to={"/users"}><div className="flex items-center justify-center">List User</div></Link>
        <Link to={"/adduser"}><div className="flex items-center justify-center">Add User</div></Link>
    </div> 
    <div>Add User</div>
    </div>
  );
}

export default AddUser;
