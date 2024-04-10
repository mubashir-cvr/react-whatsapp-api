import React from "react";
import { Link } from 'react-router-dom'

function ListUser() {
  return (
    <>
      <div>List User</div>
      <Link to={"/users"}>List User</Link>
      <Link to={"/adduser"}>Add User</Link>
    </>
  );
}

export default ListUser;
