
import { API_URL } from "../const/constants";
import RoleCard from "../components/RoleCard";
import React, { useState, useEffect } from "react";
import RoleEdit from "../components/RoleEdit";
import RoleAdd from "../components/RoleAdd";

function ListRoles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletedRole, setDeletedRole] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  
  const [editRole, setEditRole] = useState(null);

  // State to hold the role being edited

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

 

 

  const deleteRole = async (roleId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(API_URL + `auth/roles/${roleId}`, {
        method: "DELETE",
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
      setRoles((prevRoles) =>
        prevRoles.filter((item) => item._id !== deletedId)
      );
      setDeletedRole(deletedData);
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const handleDelete = (roleId) => {
    deleteRole(roleId);
  };

  const handleEdit = (role) => {
    setEditRole(role);
  };

  return (
    <div className="flex h-full p-4 w-full md:w-10/12 overflow-scroll no-scrollbar flex-col gap-2 items-center">
      <div className="flex w-full gap-2 flex-col">
        <div className="flex w-full flex-row text-sm font-medium justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-white shadow-md h-10">
          <p className="flex w-full border-r-2 px-4 justify-center">Name</p>
          <p className="flex w-full justify-center">Permissions</p>
          <p className="flex w-full justify-center">Actions</p>
        </div>
        {roles &&
          roles.map((role, index) => (
            <RoleCard
              key={index}
              role={role}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        <div
          className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
          onClick={handleAddRole}
        >
          <button>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
       <RoleAdd permissions={permissions} handleModalClose={handleModalClose}/>
      )}

      {/* Edit form */}
      {editRole && (
        <RoleEdit
          setEditRole={setEditRole}
          editRole={editRole}
          handleModalClose={handleModalClose}
          setRoles={setRoles}
          roles={roles}
          permissions={permissions}
        />
      )}
    </div>
  );
}

export default ListRoles;
