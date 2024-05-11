import { API_URL } from "../const/env_constant";
import RoleCard from "../components/role/RoleCard";
import React, { useState, useEffect } from "react";
import RoleEdit from "../components/role/RoleEdit";
import RoleAdd from "../components/role/RoleAdd";
import LoadingRoleCard from "../components/role/LoadingRoleCard";

function ListRoles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletedRole, setDeletedRole] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editRole, setEditRole] = useState(null);

  // State to hold the role being edited
  const [userPermissions, setUserPermissions] = useState([]);
  let createPermission = userPermissions.some((permission) =>
    ["createRole", "allAccess", "allAccessToRole"].some(
      (reqAccess) => reqAccess === permission
    )
  );
  let updatePermission = userPermissions.some((permission) =>
    ["updateRole", "allAccess", "allAccessToRole"].some(
      (reqAccess) => reqAccess === permission
    )
  );

  let deletePermission = userPermissions.some((permission) =>
    ["deleteRole", "allAccess", "allAccessToRole"].some(
      (reqAccess) => reqAccess === permission
    )
  );
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";


  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserPermissions(JSON.parse(userPermission).permissions);
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
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(logoutTimeout);
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
    <div className="flex h-full w-full overflow-scroll no-scrollbar flex-col items-center">
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row text-sm font-medium justify-center  text-pink-900 items-center bg-white shadow-md">
          <p className="flex w-1/3 border-r-2 px-4 items-center h-full justify-center">Name</p>
          <p className="flex w-1/3 justify-center items-center h-full border-r-2">Permissions</p>
          <p className="flex w-1/3 justify-center items-center h-full">Actions</p>
        </div>
        {isLoading ? (
          <>
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
            <LoadingRoleCard />
          </>
        ) : (
          roles.map((role, index) => (
            <RoleCard
              key={index}
              role={role}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              updatePermission={updatePermission}
              deletePermission={deletePermission}
            />
          ))
        )}
        <div className={add_button} onClick={handleAddRole}>
          <button>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <RoleAdd
          permissions={permissions}
          handleModalClose={handleModalClose}
          roles={roles}
          setRoles={setRoles}
          setShowModal={setShowModal}
         
        />
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
