import React, { useState, useEffect, useRef } from "react";
import ModalHead from "./ModalHead";
import Select from "react-select";
import { API_URL } from "../const/constants";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
function EditUser({
  selectedUser,
  handleModalClose,
  selectedUserId,
  setShowEditModal,
  setUsers,
  users,
}) {
  const [editUser, setEditUser] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    address: "",
    phoneNumber: "",
    status: "",
    user_type: "",
    role: "",
  });

  const [formMesssage, setformMesssage] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    address: "",
    phoneNumber: "",
    status: "",
    user_type: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + "auth/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setRoles(jsonResponse.data);
    };
    firstInputRef.current.focus();
    setEditUser(selectedUser);
    fetchRoles();
  }, []);

  const handleUserTypeChange = (selectedOption) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      user_type: selectedOption.value,
    }));
  };
  const handleEditInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setEditUser({ ...editUser, [name]: updatedValue });
  };
  const handleChange = (selectedOption) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      role: selectedOption,
    }));
  };

  const handleEditSubmit = async () => {
    setformMesssage({
      email: "",
      password: "",
      name: "",
      department: "",
      address: "",
      phoneNumber: "",
      status: "",
      user_type: "",
      role: "",
    });
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(editUser).forEach((key) => {
      if (key === "role") {
        formData.append(key, editUser[key]._id);
      } else {
        formData.append(key, editUser[key]);
      }
    });
    const response = await fetch(API_URL + `auth/users/${selectedUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user._id === selectedUserId ? updatedUser.data : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      const errorResponse = await response.json();
      if (errorResponse.statusCode == 422) {
        errorResponse.data.map((error) => {
          setformMesssage((prevaMessage) => ({
            ...prevaMessage,
            [error.path]: error.msg,
          }));
        });
      }
    }
  };
  const user_types = [
    { name: "STAFF", value: "STAFF" },
    { name: "ADMIN", value: "ADMIN" },
  ];

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target === lastInputRef.current) {
        handleEditSubmit();
      } else {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (form.elements[index + 1]) {
          form.elements[index + 1].focus();
        }
      }
    }
  };
  return (
    <div className="fixed p-3 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full md:w-96 p-4 rounded-lg">
        <ModalHead heading={"Edit User"} />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            disabled
            type="email"
            placeholder="Email"
            className="border-b border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="email"
            value={editUser.email}
            onChange={handleEditInputChange}
            onKeyDown={handleKeyDown}
          />
          <p id="name" className="text-xs p-1 text-red-600">
            {formMesssage.name}
          </p>

          <input
            type="text"
            placeholder="Name"
            className="border-b border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="name"
            value={editUser.name}
            onKeyDown={handleKeyDown}
            onChange={handleEditInputChange}
            ref={firstInputRef}
          />
          <p id="department" className="text-xs p-1 text-red-600">
            {formMesssage.department}
          </p>

          <input
            type="text"
            placeholder="Department"
            className="border-b border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="department"
            value={editUser.department}
            onKeyDown={handleKeyDown}
            onChange={handleEditInputChange}
          />
          <p id="address" className="text-xs p-1 text-red-600">
            {formMesssage.address}
          </p>

          <input
            type="text"
            placeholder="Address"
            className="border-b border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="address"
            value={editUser.address}
            onKeyDown={handleKeyDown}
            onChange={handleEditInputChange}
          />
          <p id="phoneNumber" className="text-xs p-1 text-red-600">
            {formMesssage.phoneNumber}
          </p>

          <input
            type="text"
            placeholder="Phone Number"
            className="border-b border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="phoneNumber"
            value={editUser.phoneNumber}
            onKeyDown={handleKeyDown}
            onChange={handleEditInputChange}
          />
          <p id="user_type" className="text-xs p-1 text-red-600">
            {formMesssage.user_type}
          </p>

          <Select
            options={user_types}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.value}
            placeholder="Select User type"
            value={{ name: editUser.user_type, value: editUser.user_type }}
            onChange={handleUserTypeChange}
            onKeyDown={handleKeyDown}
          />
          <p id="role" className="text-xs p-1 text-red-600">
            {formMesssage.role}
          </p>
          <Select
            options={roles}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Select Role"
            value={editUser.role}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <p id="status" className="text-xs mt-2 text-red-600">
            {formMesssage.status}
          </p>

          <input
            type="text"
            placeholder="Status"
            className="border  border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="status"
            value={editUser.status}
            onKeyDown={handleKeyDown}
            onChange={handleEditInputChange}
            ref={lastInputRef}
          />

          <div className="flex  mt-4 justify-center">
            <div
              className="px-4 py-2 text-pink-900 border-2 rounded-md mr-2"
              onClick={handleEditSubmit}
            >
              <BiSave className="text-lg" />
            </div>
            <div
              className="px-4 py-2  text-pink-900 border-2 rounded-md"
              onClick={handleModalClose}
            >
              <MdCancel className="text-lg" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
