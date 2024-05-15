import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { API_URL } from "../../const/env_constant";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "../common/ModalHead";

function QuotationItemEdit({
  setEditQuotationItem,
  editQuotationItem,
  handleModalClose,
  setQuotationItems,
  quotationItems,
}) {
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const [quotationItemUpdated, setQuotationItemUpdated] = useState(false);
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + `quotationItems/edit/${editQuotationItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editQuotationItem),
    });
    if (response.ok) {
      const updatedQuotationItem = await response.json();
      console.log("response");
      console.log(updatedQuotationItem);
      setQuotationItems(
        quotationItems.map((quotationItem) =>
          quotationItem._id === updatedQuotationItem.data._id
            ? updatedQuotationItem.data
            : quotationItem
        )
      );
      setQuotationItemUpdated(true);

      setTimeout(() => {
        setEditQuotationItem(null);
        setQuotationItemUpdated(false);
      }, 1500);
    } else {
      console.error("Failed to edit quotationItem");
    }
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditQuotationItem({ ...editQuotationItem, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target === lastInputRef.current) {
        handleEditSubmit();
      } else {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (form.elements[index + 1]) {
          form.elements[index + 1].focus();
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 border-2 shadow-md w-96">
        <ModalHead heading={"Edit Item"} />
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full">
          <div className="flex mb-2  relative w-full min-w-[200px]">
            <input
              type="text"
              placeholder="Name"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              name="name"
              value={editQuotationItem.name}
              ref={firstInputRef}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Name
            </label>
          </div>
          <div className="flex mb-2  relative w-full min-w-[200px]">
            <input
              type="text"
              placeholder="Length"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              name="dimention_length"
              value={editQuotationItem.dimention_length}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Length
            </label>
          </div>

          <div className="flex mb-2  relative w-full min-w-[200px]">
            <input
              type="text"
              placeholder="Breadth"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              name="dimention_breadth"
              value={editQuotationItem.dimention_breadth}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={lastInputRef}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Breadth
            </label>
          </div>
          {quotationItemUpdated && (
            <div className="text-sm text-green-500">Item Updated!</div>
          )}
          <div className="flex justify-center p-4">
            <div
              className="px-4 py-2 text-pink-900 border-2 rounded-md mr-2"
              onClick={handleEditSubmit}
            >
              <BiSave className="text-lg" />
            </div>
            <div
              className="px-4 py-2  text-pink-900 border-2 rounded-md"
              onClick={handleModalClose}
            >
              <MdCancel className="text-lg" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuotationItemEdit;
