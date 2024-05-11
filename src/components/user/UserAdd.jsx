import React, { useState, useEffect, useRef } from "react";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "../common/ModalHead";
import Select from "react-select";
import { API_URL } from "../../const/env_constant";
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
    profilePicture: null,
    user_type: "User type",
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
  const user_types = [
    { name: "STAFF", value: "STAFF" },
    { name: "ADMIN", value: "ADMIN" },
  ];
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
  };

  const handleUserTypeChange = (selectedOption) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      user_type: selectedOption.value,
    }));
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

  return (
    <div className="fixed inset-0 p-3 bg-slate-50 bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col w-full md:w-96 bg-white p-4 shadow-md border-2">
        <ModalHead heading={"Add User"} />
        <form onSubmit={(e) => e.preventDefault()}>
          <p id="name" className="text-xs p-1 text-red-600">
            {formMesssage.name}
          </p>
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

          <p id="department" className="text-xs p-1 text-red-600">
            {formMesssage.department}
          </p>
          <input
            type="text"
            placeholder="Department"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="department"
            value={newUser.department}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <p id="phoneNumber" className="text-xs p-1 text-red-600">
            {formMesssage.phoneNumber}
          </p>

          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <p id="user_type" className="text-xs p-1 text-red-600">
            {formMesssage.user_type}
          </p>
          <Select
            options={user_types}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.value}
            placeholder="Select User type"
            value={{ name: newUser.user_type, value: newUser.user_type }}
            onChange={handleUserTypeChange}
            onKeyDown={handleKeyDown}
          />
          <div className="p-1"></div>
          <p id="role" className="text-xs p-1 text-red-600">
            {formMesssage.role}{" "}
          </p>
          <Select
            options={roles}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Select Role"
            value={newUser.role}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <p id="email" className="text-xs p-1 text-red-600">
            {formMesssage.email}{" "}
          </p>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <p id="password" className="text-xs p-1 text-red-600">
            {formMesssage.password}{" "}
          </p>
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
