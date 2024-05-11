import React, { useState, useEffect, useRef } from "react";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../../const/env_constant";
import ModalHead from "../common/ModalHead";

function PermissionEdit({ setPermissions, handleModalClose }) {
  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
    objectname: "",
  });
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);

  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPermission({ ...newPermission, [name]: value });
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
    const response = await fetch(API_URL + "auth/permissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPermission),
    });
    if (response.ok) {
      // Refresh permissions list
      const updatedPermissions = await response.json();
      setPermissions((permissions) => [
        ...permissions,
        updatedPermissions.data,
      ]);
      // Close modal
      handleModalClose();
      // Clear new permission state
      setNewPermission({ name: "", description: "", objectname: "" });
    } else {
      console.error("Failed to add permission");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center justify-center flex-col">
      <div className="bg-white p-8  shadow-md border-2">
        <ModalHead heading={"Add Permission"} />
        <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter permission name"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          name="name"
          value={newPermission.name}
          onChange={handleInputChange}
          ref={firstInputRef}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="Enter description"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          name="description"
          value={newPermission.description}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="Enter object name"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          name="objectname"
          value={newPermission.objectname}
          onChange={handleInputChange}
          ref={lastInputRef}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-center">
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

export default PermissionEdit;
