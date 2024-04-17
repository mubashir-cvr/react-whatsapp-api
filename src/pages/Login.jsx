import React, { useState } from "react";
import { SiPrintables } from "react-icons/si";


function Login() {
  const API_URL = import.meta.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.innerHTML = "";
    e.preventDefault();
    try {
      const response = await fetch(API_URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data[0].token);
        window.location.href = "/";
      } else {
        let error;
        try {
          const responseData = await response.json();
          error = new Error(responseData.message || "Login failed");
          error.data = responseData.data; // Attach the response data to the error
        } catch (parseError) {
          error = new Error(response.statusText || "Login failed");
        }
        throw error;
      }
    } catch (error) {
      let errorMessage = error.message || "Unknown error occurred.";
      errorMessageElement.innerHTML = errorMessage;
  
      
      if (error.data) {
        console.log(error.data)
      }
    }
  };
  return (
    <div className="flex flex-col bg-white h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-2 md:w-4/12 w-10/12 border-2 rounded-lg justify-center bg-slate-100">
        <div className="flex items-center justify-center gap-2 px-3 py-3 w-full text-pink-900">
          <SiPrintables fontSize={24} />
          <p className="quantico-regular border-l-2 px-3">PRESS MASTER</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-1 h-full px-4 md:px-16 md:py-8 p-6">
            <div className="border-2 flex flex-col gap-6 w-full h-full justify-center items-center rounded-2xl bg-white bg-opacity-60 p-4 md:p-8">
              <div className="flex items-center justify-center text-pink-900 font-bold">
                <h2>Sign in</h2>
              </div>

              <div className="flex relative h-10 w-full min-w-[200px]">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="User Name"
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  User Name
                </label>
              </div>
              <div className="flex relative h-10 w-full min-w-[200px]">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div className="flex justify-center items-center">
                <p id="errorMessage" className=" font-light text-sm text-red-600"></p>
              </div>
              <div className="flex-1">
                <button
                  type="submit"
                  className="select-none rounded-lg border border-gray-400 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-pink-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
