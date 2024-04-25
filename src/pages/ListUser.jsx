import React, { useState, useEffect, useRef } from "react";
import UserCard from "../components/UserCard";
import { SiPrintables } from "react-icons/si";
import { API_URL } from "../const/env_constant";
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
  const [userPermissions, setUserPermissions] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
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
  //Pagination
  const [currPage, setCurrPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && isNextPage && !isSearched) {
        fetchUsers(currPage);
      }
    }
  };
  // Pagination

  let updatePermission = userPermissions.some((permission) =>
    ["updateUser", "allAccess", "allAccessToUser"].some(
      (reqAccess) => reqAccess === permission
    )
  );

  let deletePermission = userPermissions.some((permission) =>
    ["deleteUser", "allAccess", "allAccessToUser"].some(
      (reqAccess) => reqAccess === permission
    )
  );
  //fetch user
  const fetchUsers = async (page) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `auth/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
   
    const jsonResponse = await response.json();
    
    if (jsonResponse.extra) {
      if (!jsonResponse.extra.nextPage) {
        setIsNextPage(false);
      } else {
        setCurrPage(jsonResponse.extra.nextPage);
      }
    }
    if(page===1){
      setUsers([]);
    }
    setUsers((prevusers)=>[...prevusers,...jsonResponse.data]);
    const logoutTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(logoutTimeout);
  };

  const fetchSearchUsers = async (search) => {
    if (search) {
      setIsSearched(true)
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `auth/users?search=${search}`, {
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
    } else {
      setIsSearched(false)
      fetchUsers(1);
    }
  };
  //fetch user 
  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserPermissions(JSON.parse(userPermission).permissions);

    fetchUsers(currPage);
  }, []);
  let add_button = userPermissions.some((permission) =>
    ["createUser", "allAccess", "allAccessToUser"].some(
      (reqAccess) => reqAccess === permission
    )
  )
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

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
    <div
      className="flex h-full md:p-4 w-full md:w-5/12 overflow-scroll no-scrollbar flex-col items-center"
      onScroll={onScroll}
      ref={listInnerRef}
    >
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
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        )}
        <div className={add_button} onClick={handleAddUser}>
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
