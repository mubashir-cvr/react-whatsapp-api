import React, { useEffect, useRef } from "react";
import Select from "react-select";
import { API_URL } from "../const/env_constant";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "./ModalHead";
function RoleEdit({
  setEditRole,
  editRole,
  handleModalClose,
  setRoles,
  roles,
  permissions,
}) {
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + `auth/roles/${editRole._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editRole),
    });
    if (response.ok) {
      const updatedRole = await response.json();
      console.log("response");
      console.log(updatedRole);
      setRoles(
        roles.map((role) =>
          role._id === updatedRole.data._id ? updatedRole.data : role
        )
      );
      setEditRole(null); // Reset editRole state
    } else {
      console.error("Failed to edit role");
    }
  };
  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);
  const handleChange = (selectedOption) => {
    setEditRole((prevEditRole) => ({
      ...prevEditRole,
      permissions: selectedOption,
    }));
    firstInputRef.current.focus();
  };

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
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 border-2 shadow-md w-96">
        <ModalHead heading={"Edit Role"}/>
        <form onSubmit={(e) => e.preventDefault()}>
        <Select
            options={permissions}
            isMulti
            ref={firstInputRef}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Select permissions"
            value={editRole.permissions}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            
          />
          <input
            type="text"
            placeholder="Enter role name"
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            name="name"
            value={editRole.name}
            ref={lastInputRef}
            onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex justify-center p-4">
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

export default RoleEdit;
