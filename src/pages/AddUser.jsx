import React from "react";
import { Link } from "react-router-dom";

function AddUser() {
  return (
    <>
      <div>AddUser</div>
      <div>
        <Link to={"/users"}>List User</Link>
        <Link to={"/adduser"}>Add User</Link>
      </div>
    </>
  );
}

export default AddUser;
