import React, { useState, useEffect } from "react";
import { API_URL } from "../const/constant";

function ListPermissions() {
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletedPermission, setDeletedPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
    objectname: "",
  });

  const fetchPermissions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "auth/permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    setPermissions(jsonResponse.data);
  };
  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleAddPermission = async () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPermission({ ...newPermission, [name]: value });
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
      console.log(updatedPermissions);
      setPermissions((permissions) => [
        ...permissions,
        updatedPermissions.permission,
      ]);
      // Close modal
      setShowModal(false);
      // Clear new permission state
      setNewPermission({ name: "", description: "", objectname: "" });
    } else {
      console.log();
      console.error("Failed to add permission");
    }
  };

  const deletePermission = async (permissionId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        API_URL + `auth/permissions/${permissionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const deletedData = await response.json();
      let deleted_id = deletedData.deletedPermission._id;
      setPermissions((prevPermissions) =>
        prevPermissions.filter((item) => item._id !== deleted_id)
      );

      setDeletedPermission(deletedData);
    } catch (error) {}
  };

  const handleDelete = (permissionId) => {
    deletePermission(permissionId);
  };

  return (
    <div className="flex h-full p-4 w-full md:w-10/12 overflow-scroll no-scrollbar flex-col gap-2 items-center">
      <div className="flex w-full gap-2 flex-col">
        <div className="flex w-full flex-row text-sm font-medium justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-slate-300 rounded-xl h-10">
          <p className="flex w-full border-r-2 px-4 justify-center">Name</p>
          <p className="flex w-full border-r-2 px-4 justify-center">Desc</p>
          <p className="flex w-full justify-center">Object</p>
          <p className="flex w-full justify-center">Action</p>
        </div>

        {permissions.map((permission, index) => (
          <div
            key={index}
            className="flex w-full flex-row text-xs justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-slate-300 rounded-xl h-10"
          >
            <p className="flex w-1/5 border-r-2 px-4 justify-center">
              {permission.name ? permission.name : "N/A"}
            </p>
            <p className="flex w-2/5 border-r-2 px-4 justify-center">
              {permission.description ? permission.description : "N/A"}
            </p>
            <p className="flex w-1/5 justify-center">
              {permission.objectname ? permission.objectname : "All"}
            </p>
            <div className="flex w-1/5 justify-center">
              <button
                onClick={() => handleDelete(permission._id)}
                className=" bg-red-500 text-white text-xs p-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div
          className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
          onClick={handleAddPermission}
        >
          <button>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Permission</h2>
            <input
              type="text"
              placeholder="Enter permission name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="name"
              value={newPermission.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter description"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="description"
              value={newPermission.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter object name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="objectname"
              value={newPermission.objectname}
              onChange={handleInputChange}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                onClick={handleSubmit}
              >
                Add
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPermissions;
