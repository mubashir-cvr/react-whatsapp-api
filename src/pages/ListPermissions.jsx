import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../const/constants";
import PermissionCard from "../components/PermissionCard";
import PermissionEdit from "../components/PermissionEdit";

function ListPermissions() {
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currPage, setCurrPage] = useState(1); 
  const [isNextPage,setIsNextPage] = useState(true); 
  const [wasLastList, setWasLastList] = useState(false);
  const listInnerRef = useRef();
  const fetchPermissions = async (page) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `auth/permissions?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    if(jsonResponse.extra){
      if(!jsonResponse.extra.nextPage){
        setIsNextPage(false)
      }
      else{
        setCurrPage(jsonResponse.extra.nextPage)
      }
    }
    setPermissions((prevPermissions) => [...prevPermissions, ...jsonResponse.data]);
    
  };
  useEffect(() => {
    fetchPermissions(currPage);
  }, []);

  const handleAddPermission = async () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if(isNextPage){
          fetchPermissions(currPage)
        }
      }
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
      let deleted_id = deletedData.data._id;
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
    <div
      className="flex h-full p-4 w-full md:w-10/12 overflow-scroll no-scrollbar flex-col gap-2 items-center"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="flex w-full gap-2 flex-col">
        <div className="flex w-full flex-row text-sm quantico-regular font-medium justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-white shadow-md h-10">
          <p className="flex w-full border-r-2 px-4 justify-center">Name</p>
          <p className="flex w-full border-r-2 px-4 justify-center">Desc</p>
          <p className="flex w-full justify-center">Object</p>
          <p className="flex w-full justify-center">Action</p>
        </div>

        {permissions.map((permission, index) => (
          <PermissionCard
            key={index}
            index={index}
            permission={permission}
            handleDelete={handleDelete}
          />
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
        <PermissionEdit
          setPermissions={setPermissions}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default ListPermissions;
