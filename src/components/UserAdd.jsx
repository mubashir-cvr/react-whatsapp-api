import React, { useState, useEffect, useRef } from "react";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "./ModalHead";
import Select from "react-select";
import { API_URL } from "../const/constants";
function UserAdd({ users, handleModalClose, setShowCreateModal, setUsers }) {
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    address: "",
    phoneNumber: "",
    status: "",
    profilePicture: null,
    user_type: "",
    role: "",
  });
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
    fetchRoles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setNewUser({ ...newUser, [name]: updatedValue });
  };
  const handleChange = (selectedOption) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      role: selectedOption,
    }));
    console.log(newUser);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target === lastInputRef.current) {
        handleSubmit();
      } else {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (form.elements[index + 1]) {
          form.elements[index + 1].focus();
        }
      }
    }
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(newUser).forEach((key) => {
      if (key === "role") {
        formData.append(key, newUser[key]._id);
      } else {
        formData.append(key, newUser[key]);
      }
    });

    const response = await fetch(API_URL + "auth/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const updatedUser = await response.json();
      console.log(updatedUser.data);
      setUsers([...users, updatedUser.data]);
      setShowCreateModal(false);
      setNewUser({
        email: "",
        password: "",
        name: "",
        department: "",
        address: "",
        phoneNumber: "",
        status: "",
        profilePicture: null,
        user_type: "",
        role: "",
      });
    } else {
      console.error("Failed to add user");
    }
  };

  return (
    <div className="fixed inset-0 p-3 bg-slate-50 bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col w-full md:w-96 bg-white p-4 shadow-md border-2">
        <ModalHead heading={"Add User"} />
        <form onSubmit={(e) => e.preventDefault()}>
         
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={firstInputRef}
          />
          <input
            type="text"
            placeholder="Department"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="department"
            value={newUser.department}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <select
            className="border text-gray-400 border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="user_type"
            value={newUser.user_type}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          >
            <option value="">User Type</option>
            <option value="STAFF">STAFF</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <Select
            options={roles}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Select Role"
            value={newUser.role}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Status"
            className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            
          />
           <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={lastInputRef}
          />

          <div className="flex  mt-4 justify-center">
            <div
              className="px-4 py-2 text-pink-900 border-2 rounded-md mr-2"
              onClick={handleSubmit}
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

export default UserAdd;
