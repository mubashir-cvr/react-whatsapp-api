import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { SiPrintables } from "react-icons/si";
import { API_URL } from "../const/constants";
import LoadingUserCard from "../components/LoadingUserCard";
import UserAdd from "../components/UserAdd";
import EditUser from "../components/EditUser";
import SearchItems from "../components/SearchItems";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(logoutTimeout);
    };

    fetchUsers();
  }, []);

  const fetchSearchUsers = async (search) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "auth/users?search=" + search, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    setUsers(jsonResponse.data);
    const logoutTimeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(logoutTimeout);
  };

  const handleAddUser = () => {
    setShowCreateModal(true);
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedUserId(null);
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

  return (
    <div className="flex h-full md:p-4 w-full md:w-5/12 overflow-scroll no-scrollbar flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-12 border-2">
        <SiPrintables fontSize={24} />
        <p className="quantico-regular  px-3">USERS</p>
      </div>
      <div className="flex w-full min-h-14 items-center justify-center border-2 mb-2">
        <div className="relative w-10/12 flex">
          <SearchItems fetcher={fetchSearchUsers} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        {loading ? (
          <div className="flex w-full flex-col gap-2">
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
            <LoadingUserCard />
          </div>
        ) : (
          users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
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
        <UserAdd
          users={users}
          handleModalClose={handleModalClose}
          setShowCreateModal={setShowCreateModal}
          setUsers={setUsers}
        />
      )}

      {showEditModal && (
        <EditUser
          selectedUser={editUser}
          users={users}
          handleModalClose={handleModalClose}
          selectedUserId={selectedUserId}
          setShowEditModal={setShowEditModal}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}

export default ListUser;
