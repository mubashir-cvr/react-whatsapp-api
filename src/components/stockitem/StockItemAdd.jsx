import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../../const/env_constant";
import ModalHead from "../common/ModalHead";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function StockItemAdd({
  handleModalClose,
  stockItems,
  setStockItems,
  setShowModal,
}) {
  const [newStock, setNewStock] = useState({
    item: "",
    item_type: "",
    gsm: "",
    dimention_length: "",
    dimention_breadth: "",
    unit_of_measurement: "",
    unitPrice: "",
    suitablePrinters:[]
  });
  const [printer, setPrinter] = useState(null);
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStock({ ...newStock, [name]: value });
  };
  const [printerComponents, setPrinterComponents] = useState([
    { id: 0, printer: null, sheetCapacity: 0 },
  ]);
  useEffect(() => {
    // Focus on the first input field when the component mounts
    firstInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    let updatedStock = { ...newStock };
    
    if (printerComponents[0].sheetCapacity != 0) {
        updatedStock.suitablePrinters = printerComponents;
    }

    setNewStock(updatedStock);
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "stockitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedStock),
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
        unit_of_measurement: "",
        unitPrice: "",
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

  const handleAddPrinterSelect = () => {
    setPrinterComponents((prevComponents) => [
      ...prevComponents,
      { id: prevComponents.length, printer: null, sheetCapacity: 0 },
    ]);
  };

  const handlePrinterChange = (id, selectedOption) => {
    setPrinterComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id
          ? { ...component, printer: selectedOption }
          : component
      )
    );
  };
  const handleCapacityChange = (id, event) => {
    const value = parseFloat(event.target.value);
    setPrinterComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, sheetCapacity: value } : component
      )
    );
  };

  const handleDeletePrinter = (id) => {
    setPrinterComponents((prevComponents) => {
      const updatedComponents = prevComponents.filter((component) => component.id !== id);
      return updatedComponents.map((component, index) => ({
        ...component,
        id: index,
      }));
    });
  };
  useEffect(() => {
  }, [printerComponents]);

  return (
    <div className="fixed inset-0 pt-40 pb-14 bg-slate-50 bg-opacity-50 overflow-scroll flex items-center justify-center px-2">
      <div className="bg-white p-4 border-2 shadow-md w-full px-3 md:w-6/12">
        <ModalHead heading={"Create Item"} />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center h-full"
        >
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
            placeholder="Measurment unit 'KG', 'LENGTH', 'COUNT'"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="unit_of_measurement"
            value={newStock.unit_of_measurement}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            placeholder="Unit Price"
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
            name="unitPrice"
            value={newStock.unitPrice}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            // ref={lastInputRef}
          />
          <p className="w-full pl-2 text-xs text-gray-400 items-start">
            Suitable Printers{" "}
            <span className="text-gray-500 text-[8px]"> (Optional)</span>
          </p>
          <div
            id="printersDiv"
            className="flex flex-col gap-2 w-full border p-2 rounded-lg"
          >
            {printerComponents.map((component, index) => (
              <PrinterSelect
                key={component.id}
                id={component.id}
                printer={component.printer}
                sheetCapacity={component.sheetCapacity}
                handleAddPrinterSelect={handleAddPrinterSelect}
                handlePrinterChange={handlePrinterChange}
                handleCapacityChange={handleCapacityChange}
                handleDeletePrinter={handleDeletePrinter}
              />
            ))}
          </div>

          <div className="flex justify-center p-4">
            <div
              className="px-4 py-2 hover:cursor-pointer text-pink-900 border-2 rounded-md mr-2"
              onClick={handleSubmit}
            >
              <BiSave className="text-lg" />
            </div>
            <div
              className="px-4 py-2 hover:cursor-pointer  text-pink-900 border-2 rounded-md"
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

export default StockItemAdd;

function PrinterSelect({
  id,
  handleAddPrinterSelect,
  handlePrinterChange,
  handleCapacityChange,
  printer,
  sheetCapacity,
  handleDeletePrinter,
}) {
  const [printers, setPrinters] = useState([]);
  const capacityInputRef = useRef(null);

  const fetchSearchPrinters = async (search) => {
    if (search) {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `printers?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setPrinters(jsonResponse.data);
    }
  };

  const searchPrinter = (value) => {
    fetchSearchPrinters(value);
  };

  useEffect(() => {
    fetchSearchPrinters(" ");
  }, []);

  useEffect(() => {
    if (capacityInputRef.current) {
      capacityInputRef.current.addEventListener("focus", () => {
        capacityInputRef.current.select();
      });
    }
  }, []);

  return (
    <div className="flex h-full items-center flex-row gap-2">
      <Select
        name="printer"
        options={printers}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option._id}
        placeholder="Printer"
        className="border border-gray-300 rounded-md h-full w-2/3"
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        value={printer}
        onChange={(selectedOption) => handlePrinterChange(id, selectedOption)}
        onInputChange={searchPrinter}
      />
      <input
        type="number"
        placeholder="Paper Capacity"
        className="border border-gray-300 rounded-md h-10 px-2 w-1/3"
        name="sheetCapacity"
        value={sheetCapacity}
        ref={capacityInputRef}
        onChange={(event) => handleCapacityChange(id, event)}
      />
      <div
        onClick={handleAddPrinterSelect}
        className="flex h-full border hover:cursor-pointer border-pink-900 rounded-lg p-2"
      >
        <FaPlus className="text-sm text-pink-900" />
      </div>
      <div
        onClick={() => handleDeletePrinter(id)}
        className="flex h-full border hover:cursor-pointer border-pink-900 rounded-lg p-2"
      >
        <MdDeleteForever className="text-sm text-pink-900" />
      </div>
    </div>
  );
}