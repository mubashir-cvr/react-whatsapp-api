import React, { useState } from "react";
import { SiPrintables } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { API_URL } from "../const/env_constant";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formMesssage, setformMesssage] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setformMesssage({
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    });
    console.log(JSON.stringify({ oldPassword, newPassword, rePassword }));
    // Reset error state
    setError("");
    const token = localStorage.getItem("token");
    fetch(API_URL + `auth/reset-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword, rePassword }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorResponse) => {
            if (errorResponse.statusCode == 422) {
              errorResponse.data.map((error) => {
                setformMesssage((prevaMessage) => ({
                  ...prevaMessage,
                  [error.path]: error.msg,
                }));
              });
            }
          });
        } else {
          response.json().then((errorResponse) => {
            navigate("/profile");
          });
        }
      })
      .then((data) => {
        // Handle successful password reset
        console.log(data);
      })
      .catch((error) => {
        setError("Password reset failed. Please try again.");
        console.error("Error:", error);
      });
  };

  const HandleAllCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="flex h-full p-4 w-full md:w-5/12 flex-col items-center">
      <div className="flex flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-12 border-2">
        <SiPrintables fontSize={24} />
        <p className="quantico-regular  px-3">Change Password</p>
      </div>
      <div className="flex w-full border-2 justify-center p-2 items-center h-full overflow-scroll no-scrollbar shadow-md flex-col gap-2">
        <div className="flex flex-col gap-3 p-4 w-3/4  h-64 border-2">
          <form onSubmit={handleSubmit}>
            <p className="text-center justify-center text-xs text-red-600 ">
              {formMesssage.oldPassword}
            </p>
            <input
              placeholder="Current Password"
              type="password"
              id="oldPassword"
              value={oldPassword}
              className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <p className="text-center justify-center text-xs text-red-600 ">
              {formMesssage.newPassword}
            </p>
            <input
              placeholder="New Password"
              type="Password"
              id="newPassword"
              value={newPassword}
              className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <p className="text-center justify-center text-xs text-red-600 ">
              {formMesssage.rePassword}
            </p>
            <input
              placeholder="Re-Password"
              type="Password"
              id="rePassword"
              value={rePassword}
              className="border-b text-sm font-medium quantico-regular text-pink-900 text-center justify-center border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />

            <div className="flex  mt-4 justify-center mb-4">
              <div
                className="px-4 py-2 text-pink-900 border rounded-md mr-2"
                onClick={handleSubmit}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
