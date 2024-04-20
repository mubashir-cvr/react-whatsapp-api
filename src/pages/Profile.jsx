import React, { useState, useEffect } from "react";
import { SiPrintables } from "react-icons/si";
import { FiEdit } from "react-icons/fi";
import { API_URL } from "../const/constants";
import { useAuth } from "../Auth/AuthProvider";
import { MdCancel } from "react-icons/md";
import { BiSave } from "react-icons/bi";
function Profile() {
  const { user } = useAuth();
  const [image, setImage] = useState(user.profilePicture);
  const [profile, setProfile] = useState(user);
  useEffect(() => {}, []);
  const [formMesssage, setformMesssage] = useState({
    email: "",
    password: "",
    name: "",
    department: "",
    address: "",
    phoneNumber: "",
    status: "",
    user_type: "",
    role: "",
  });
  const [editableFields, setEditableFields] = useState({
    name: false,
    department: false,
    address: false,
    phoneNumber: false,
    user_type: false,
    role: false,
    status: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const { name, value, files } = e.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setProfile({ ...profile, [name]: updatedValue });
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const renderImagePreview = () => {
    if (image) {
      return <img src={image} alt="Profile" className="rounded-image" />;
    } else {
        return <img src="https://gravatar.com/avatar/76553f3d42ace4850e8a0da3408ef808?s=400&d=mp&r=x" alt="Profile" className="rounded-image" />;

    }
  };

  const handleEditInputChange = (event) => {
    const { name, value, files } = event.target;
    const updatedValue = name === "profilePicture" ? files[0] : value;
    setProfile({ ...profile, [name]: updatedValue });
  };

  const handleEditSubmit = async () => {
    setformMesssage({
      email: "",
      password: "",
      name: "",
      department: "",
      address: "",
      phoneNumber: "",
      status: "",
      user_type: "",
      role: "",
    });
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      if (key === "role") {
        formData.append(key, profile[key]._id);
      } else {
        formData.append(key, profile[key]);
      }
    });
    const response = await fetch(API_URL + `auth/users/${selectedUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user._id === selectedUserId ? updatedUser.data : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      const errorResponse = await response.json();
      if (errorResponse.statusCode == 422) {
        errorResponse.data.map((error) => {
          setformMesssage((prevaMessage) => ({
            ...prevaMessage,
            [error.path]: error.msg,
          }));
        });
      }
    }
  };

  const handleEditClick = (fieldName) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };
  const handleCancelEdit = (fieldName) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
    setProfile({ ...profile, [fieldName]: user[fieldName] });
  };
  const HandleAllCancel = () => {
    setEditableFields({
      name: false,
      department: false,
      address: false,
      phoneNumber: false,
      user_type: false,
      role: false,
      status: false,
    });
  };

  const user_types = [
    { name: "STAFF", value: "STAFF" },
    { name: "ADMIN", value: "ADMIN" },
  ];

  return (
    <div className="flex h-full p-4 w-full md:w-5/12 overflow-scroll no-scrollbar flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-12 border-2">
        <SiPrintables fontSize={24} />
        <p className="quantico-regular  px-3">Profile</p>
      </div>
      <div className="flex w-full border-2 h-full shadow-md flex-col gap-2">
        <div className="flex items-center justify-center w-full pt-4">
          <div className="image-container h-24 w-24">
            {renderImagePreview()}
            <input
              type="file"
              id="profilPicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
            <label
              htmlFor="profilPicture"
              className="image-label text-lg text-pink-900"
            >
              <FiEdit />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center w-full ">
          <p>
            <div className="flex flex-row gap-3 items-center justify-center border-b-2 h-8 px-3 py-2 w-full mr-2">
              <p className="text-pink-900 text-sm font-medium quantico-regular">
                {profile.email || "email"}
              </p>
            </div>
          </p>
        </div>

        <div className="flex flex-col gap-3 p-4 md:p-8 h-full">
          {editableFields.name ? (
            <>
              <p className="text-center justify-center text-xs text-red-600 ">
                {formMesssage.address}
              </p>
              <div className="flex w-full h-8 items-center justify-center relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                  name="name"
                  value={profile.name}
                  onChange={handleEditInputChange}
                />
                {/* <BiSave className="text-lg text-pink-900 cursor-pointer" onClick={handleEditSubmit} /> */}
                <MdCancel
                  className="text-lg absolute right-4 text-pink-900 cursor-pointer ml-2"
                  onClick={() => handleCancelEdit("name")}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3 items-center justify-center shadow-sm h-8 rounded-md px-3 py-2 w-full mr-2">
                <p className="text-pink-900 text-sm font-medium quantico-regular">
                  Name: {profile.name}
                </p>
                <FiEdit
                  className="text-lg text-pink-900 cursor-pointer"
                  onClick={() => handleEditClick("name")}
                />
              </div>
            </>
          )}
          {editableFields.department ? (
            <>
              <p className="text-center justify-center text-xs text-red-600 ">
                {formMesssage.department}
              </p>
              <div className="flex w-full h-8 items-center justify-center relative">
                <input
                  type="text"
                  className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                  name="department"
                  placeholder="Department"
                  value={profile.department}
                  onChange={handleEditInputChange}
                />
                {/* <BiSave className="text-lg text-pink-900 cursor-pointer" onClick={handleEditSubmit} /> */}
                <MdCancel
                  className="text-lg absolute right-4 text-pink-900 cursor-pointer ml-2"
                  onClick={() => handleCancelEdit("department")}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3 items-center justify-center shadow-sm h-8 rounded-md px-3 py-2 w-full mr-2">
                <p className="text-pink-900 text-sm font-medium quantico-regular">
                  Desig : {profile.department || "department"}
                </p>
                <FiEdit
                  className="text-lg text-pink-900 cursor-pointer"
                  onClick={() => handleEditClick("department")}
                />
              </div>
            </>
          )}
          {editableFields.address ? (
            <>
              <p className="text-center justify-center text-xs text-red-600 ">
                {formMesssage.address}
              </p>
              <div className="flex w-full h-8 items-center justify-center relative">
                <input
                  type="text"
                  className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                  name="address"
                  placeholder="Address"
                  value={profile.address}
                  onChange={handleEditInputChange}
                />
                {/* <BiSave className="text-lg text-pink-900 cursor-pointer" onClick={handleEditSubmit} /> */}
                <MdCancel
                  className="text-lg absolute right-4 text-pink-900 cursor-pointer ml-2"
                  onClick={() => handleCancelEdit("address")}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3 items-center justify-center shadow-sm h-8 rounded-md px-3 py-2 w-full mr-2">
                <p className="text-pink-900 text-sm font-medium quantico-regular">
                  Place : {profile.address || "no address !"}
                </p>
                <FiEdit
                  className="text-lg text-pink-900 cursor-pointer"
                  onClick={() => handleEditClick("address")}
                />
              </div>
            </>
          )}

          {editableFields.phoneNumber ? (
            <>
              <p className="text-center justify-center text-xs text-red-600 ">
                {formMesssage.phoneNumber}
              </p>
              <div className="flex w-full h-8 items-center justify-center relative">
                <input
                  type="text"
                  className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                  name="phoneNumber"
                  placeholder="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleEditInputChange}
                />
                {/* <BiSave className="text-lg text-pink-900 cursor-pointer" onClick={handleEditSubmit} /> */}
                <MdCancel
                  className="text-lg absolute right-4 text-pink-900 cursor-pointer ml-2"
                  onClick={() => handleCancelEdit("phoneNumber")}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3 items-center justify-center shadow-sm h-8 rounded-md px-3 py-2 w-full mr-2">
                <p className="text-pink-900 text-sm font-medium quantico-regular">
                  MOB : {profile.phoneNumber || "No Phone Number"}
                </p>
                <FiEdit
                  className="text-lg text-pink-900 cursor-pointer"
                  onClick={() => handleEditClick("phoneNumber")}
                />
              </div>
            </>
          )}

          <div className="flex w-full items-center justify-center">
            <p className="text-pink-900 text-sm font-medium quantico-regular">
              Change Password
            </p>
          </div>

          <div className="flex  mt-4 justify-center">
            <div
              className="px-4 py-2 text-pink-900 border rounded-md mr-2"
              onClick={handleEditSubmit}
            >
              <BiSave className="text-lg" />
            </div>
            <div
              className="px-4 py-2  text-pink-900 border rounded-md"
              onClick={HandleAllCancel}
            >
              <MdCancel className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
