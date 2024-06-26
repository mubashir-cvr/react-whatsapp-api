import  { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../../const/env_constant";
import ModalHead from "../common/ModalHead";
// eslint-disable-next-line react/prop-types
function RoleAdd({handleModalClose,roles,setRoles,setShowModal }) {
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);

  const handlePermissionSelect = (selectedOptions) => {
    const selectedPermissions = selectedOptions.map((option) => option);
    setNewRole({ ...newRole, permissions: selectedPermissions });
    firstInputRef.current.focus();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRole({ ...newRole, [name]: value });
  };
  const fetchPermissions = async (search) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `auth/permissions?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    setPermissions(jsonResponse.data);
  };
  useEffect(() => {
    fetchPermissions("")
    firstInputRef.current.focus();
  }, []);
  const searchItems = (value) => {
    fetchPermissions(value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "auth/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRole),
    });
    if (response.ok) {
      const updatedRoles = await response.json();
      console.log(updatedRoles);
      setRoles([...roles, updatedRoles.data]);
      setShowModal(false);
      setNewRole({ name: "", permissions: [] });
    } else {
      console.error("Failed to add role");
    }
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
  return (
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center justify-center px-2">
      <div className="bg-white p-4  border-2 shadow-md w-full px- h-1/2 md:w-6/12">
      <ModalHead heading={'Create Role'}/>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full">

        <Select
            className="w-full mb-4"
            options={permissions}
            isMulti
            placeholder="Select permissions"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            onChange={handlePermissionSelect}
            onKeyDown={handleKeyDown}
            onInputChange={searchItems}
            ref={firstInputRef}

          />
          <input
            type="text"
            placeholder="Enter role name"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="name"
            value={newRole.name}
            ref={lastInputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            
          />
          
          <div className="flex justify-center p-4">
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

export default RoleAdd;
