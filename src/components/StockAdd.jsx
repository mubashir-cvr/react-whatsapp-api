import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../const/constants";
import ModalHead from "./ModalHead";

function StockAdd({ handleModalClose, stocks, setStocks, setShowModal }) {
  const [newStock, setNewStock] = useState({
    materialType: "",
    quantity: "",
    unit: "",
    as_on_date: "",
  });

  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStock({ ...newStock, [name]: value });
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newStock),
    });
    if (response.ok) {
      const createdStock = await response.json();
      console.log(createdStock);
      setStocks([...stocks, createdStock.data]);
      setShowModal(false);
      setNewStock({ materialType: "", quantity: "", unit: "", as_on_date: "" });
    } else {
      console.error("Failed to add stock");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target === lastInputRef.current) {
        handleSubmit();
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
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center justify-center px-2">
      <div className="bg-white p-4 border-2 shadow-md w-full px- h-1/2 md:w-6/12">
        <ModalHead heading={"Create Stock"} />
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Enter material type"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="materialType"
            value={newStock.materialType}
            ref={firstInputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="number"
            placeholder="Enter quantity"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="quantity"
            value={newStock.quantity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Enter unit"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="unit"
            value={newStock.unit}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="date"
            placeholder="Select date"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="as_on_date"
            value={newStock.as_on_date}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={lastInputRef}
          />
          <div className="flex justify-center p-4">
            <div className="px-4 py-2 text-pink-900 border-2 rounded-md mr-2" onClick={handleSubmit}>
              <BiSave className="text-lg" />
            </div>
            <div className="px-4 py-2  text-pink-900 border-2 rounded-md" onClick={handleModalClose}>
              <MdCancel className="text-lg" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockAdd;
