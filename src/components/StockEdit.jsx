import React, { useEffect, useRef } from "react";
import Select from "react-select";
import { API_URL } from "../const/env_constant";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "./ModalHead";

function StockEdit({
  setEditStock,
  editStock,
  handleModalClose,
  setStocks,
  stocks,
}) {
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + `stocks/${editStock._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editStock),
    });
    if (response.ok) {
      const updatedStock = await response.json();
      console.log("response");
      console.log(updatedStock);
      setStocks(
        stocks.map((stock) =>
          stock._id === updatedStock.data._id ? updatedStock.data : stock
        )
      );
      setEditStock(null); // Reset editStock state
    } else {
      console.error("Failed to edit stock");
    }
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditStock({ ...editStock, [name]: value });
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
        <ModalHead heading={"Edit Stock"} />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter material type"
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            name="materialType"
            value={editStock.materialType}
            onChange={handleInputChange}
            ref={firstInputRef}
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            placeholder="Enter quantity"
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            name="quantity"
            value={editStock.quantity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Enter unit"
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            name="unit"
            value={editStock.unit}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="date"
            placeholder="Select date"
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            name="as_on_date"
            value={editStock.as_on_date}
            onChange={handleInputChange}
            ref={lastInputRef}
            onKeyDown={handleKeyDown}
          />

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

export default StockEdit;
