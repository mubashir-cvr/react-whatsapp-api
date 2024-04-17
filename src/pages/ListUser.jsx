import React, { useState, useEffect } from "react";
import { API_URL } from "../const/constant";
import UserCard from "../components/UserCard";
import { SiPrintables } from "react-icons/si";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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
  const [editUser, setEditUser] = useState({
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
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + "auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setUsers(jsonResponse.data);
      console.log(jsonResponse.data)
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setShowCreateModal(true);
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedUserId(null);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setNewUser({ ...newUser, [name]: updatedValue });
  };

  const handleEditInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setEditUser({ ...editUser, [name]: updatedValue });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(newUser).forEach((key) => {
      formData.append(key, newUser[key]);
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
      console.log(updatedUser.data)
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

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `/auth/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setUsers(users.filter((user) => user._id !== userId));
    } else {
      console.error("Failed to delete user");
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    if (userToEdit) {
      setSelectedUserId(userId);
      setEditUser(userToEdit);
      setShowEditModal(true);
    }
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(editUser).forEach((key) => {
      formData.append(key, editUser[key]);
    });

    const response = await fetch(API_URL + `/auth/users/${selectedUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user._id === selectedUserId ? updatedUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <div className="flex h-full md:p-4 w-full md:w-5/12 overflow-scroll no-scrollbar flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center text-pink-900 w-full h-12 border-2 mb-2">
      <SiPrintables fontSize={24}/>
        <p className="quantico-regular  px-3">USERS</p>
      </div>
      <div className="flex w-full flex-col">
        {users.map((user, index) => (
          <UserCard key={index} user={user} handleDelete={handleDelete} index={index} handleEdit={handleEdit}/>
        ))}
        <div
          className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
          onClick={handleAddUser}
        >
          <button>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Department"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="department"
              value={newUser.department}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Address"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="address"
              value={newUser.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Status"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="User Type"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="user_type"
              value={newUser.user_type}
              onChange={handleInputChange}
            />
            {/* Assuming role is selected from a dropdown */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              {/* Map over roles if available */}
            </select>
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="profilePicture"
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

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="email"
              value={editUser.email}
              onChange={handleEditInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="password"
              value={editUser.password}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="name"
              value={editUser.name}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="Department"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="department"
              value={editUser.department}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="Address"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="address"
              value={editUser.address}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="phoneNumber"
              value={editUser.phoneNumber}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="Status"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="status"
              value={editUser.status}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              placeholder="User Type"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="user_type"
              value={editUser.user_type}
              onChange={handleEditInputChange}
            />
            {/* Assuming role is selected from a dropdown */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="role"
              value={editUser.role}
              onChange={handleEditInputChange}
            >
              <option value="">Select Role</option>
              {/* Map over roles if available */}
            </select>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                onClick={handleEditSubmit}
              >
                Save
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

export default ListUser;
