import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../const/constants";
import ModalHead from "./ModalHead";

function StockItemAdd({ handleModalClose, stockItems, setStockItems, setShowModal }) {
  const [newStock, setNewStock] = useState({
    item: "",
    item_type: "",
    gsm: "",
    dimention_length: "",
    dimention_breadth: "",
    unit_of_measurement: ""
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
    const response = await fetch(API_URL + "stockitems", {
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
      setStockItems([...stockItems, createdStock.data]);
      setShowModal(false);
      setNewStock({
        item: "",
        item_type: "",
        gsm: "",
        dimention_length: "",
        dimention_breadth: "",
        unit_of_measurement: ""
      });
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
      <div className="bg-white p-4 border-2 shadow-md w-full px-3 md:w-6/12">
        <ModalHead heading={"Create Stock Item"} />
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Item Name"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="item"
            value={newStock.item}
            ref={firstInputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
       
          <input
            type="text"
            placeholder="Item Type (Paper/Plate e..))"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="item_type"
            value={newStock.item_type}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="gsm"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="gsm"
            value={newStock.gsm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
            <input
            type="text"
            placeholder="Length"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="dimention_length"
            value={newStock.dimention_length}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
           <input
            type="text"
            placeholder="Breadth"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="dimention_breadth"
            value={newStock.dimention_breadth}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
           <input
            type="text"
            placeholder="Measurment unit 'KG', 'METER', 'NUMBER'"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="unit_of_measurement"
            value={newStock.unit_of_measurement}
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

export default StockItemAdd;
