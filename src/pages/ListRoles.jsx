import React, { useState, useEffect } from "react";
import Select from "react-select";
import { API_URL } from "../const/constants";


function ListRoles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletedRole, setDeletedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);
  const [editRole, setEditRole] = useState(null); // State to hold the role being edited

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

    fetchRoles();

    const fetchPermissions = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + "auth/permissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setPermissions(jsonResponse.data);
    };

    fetchPermissions();
  }, []);

  const handleAddRole = async () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditRole(null); // Reset editRole state when modal is closed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handlePermissionSelect = (selectedOptions) => {
    const selectedPermissions = selectedOptions.map(option => option.value);
    setNewRole({ ...newRole, permissions: selectedPermissions });
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
      console.log(updatedRoles)
      setRoles([...roles, updatedRoles.data]);
      setShowModal(false);
      setNewRole({ name: "", permissions: [] });
    } else {
      console.error("Failed to add role");
    }
  };

  const deleteRole = async (roleId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(API_URL + `auth/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const deletedData = await response.json();
      let deletedId = deletedData.data._id;
      setRoles(prevRoles => prevRoles.filter(item => item._id !== deletedId));
      setDeletedRole(deletedData);
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const handleDelete = (roleId) => {
    deleteRole(roleId);
  };

  const handleEdit = (role) => {
    setEditRole(role); // Set the role to be edited
  };

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
      console.log(updatedRole);
      // Update the roles array with the edited role
      setRoles(roles.map(role => role._id === updatedRole.role._id ? updatedRole.role : role));
      setEditRole(null); // Reset editRole state
    } else {
      console.error("Failed to edit role");
    }
  };

  const permissionOptions = permissions.map(permission => ({
    value: permission._id,
    label: permission.name,
  }));

  return (
    <div className="flex h-full p-4 w-full md:w-10/12 overflow-scroll no-scrollbar flex-col gap-2 items-center">
      <div className="flex w-full gap-2 flex-col">
        <div className="flex w-full flex-row text-sm font-medium justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-slate-300 rounded-xl h-10">
          <p className="flex w-full border-r-2 px-4 justify-center">Name</p>
          <p className="flex w-full justify-center">Permissions</p>
          <p className="flex w-full justify-center">Actions</p>
        </div>
        {roles &&
          roles.map((role, index) => (
            <div
              key={index}
              className="flex w-full flex-row text-xs justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-slate-300 rounded-xl h-10"
            >
              <p className="flex w-1/3 border-r-2 px-4 justify-center">{role.name}</p>
              <p className="flex w-1/3 px-4 justify-center">{role.permissions.map(permission => permission.name).join(", ")}</p>
              <div className="flex w-1/3 justify-center">
                <button onClick={() => handleEdit(role)} className="bg-blue-500 text-white text-xs p-1 rounded-lg mr-2">Edit</button>
                <button onClick={() => handleDelete(role._id)} className="bg-red-500 text-white text-xs p-1 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        <div className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl" onClick={handleAddRole}>
          <button>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Role</h2>
            <input type="text" placeholder="Enter role name" className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full" name="name" value={newRole.name} onChange={handleInputChange} />
            <Select
              options={permissionOptions}
              isMulti
              placeholder="Select permissions"
              onChange={handlePermissionSelect}
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleSubmit}>Add</button>
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editRole && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <input type="text" placeholder="Enter role name" className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full" name="name" value={editRole.name} onChange={(e) => setEditRole({ ...editRole, name: e.target.value })} />
            <Select
              options={permissionOptions}
              isMulti
              placeholder="Select permissions"
              value={editRole.permissions.map(permission => ({ value: permission._id, label: permission.name }))}
              onChange={(selectedOptions) => setEditRole({ ...editRole, permissions: selectedOptions.map(option => option.value) })}
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleEditSubmit}>Save</button>
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setEditRole(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListRoles;
