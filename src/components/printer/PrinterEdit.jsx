import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { API_URL } from "../../const/env_constant";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import ModalHead from "../common/ModalHead";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function PrinterEdit({
  setEditPrinter,
  editPrinter,
  handleModalClose,
  setPrinters,
  printers,
}) {
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const [printerUpdated, setSizeUpdated] = useState(false);
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    let newPrinterData = { ...editPrinter };

    if (chargeComponents[0].plateCharge != 0) {
     let chargesData= chargeComponents.map((component)=>{
        let componentUpdated={ ...component }
        componentUpdated.colour=component.colour.name;
        return componentUpdated;
      })
      newPrinterData.charges = chargesData;
    }
    const response = await fetch(API_URL + `printers/edit/${editPrinter._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPrinterData),
    });
    if (response.ok) {
      const updatedPrinter = await response.json();
  
      setPrinters(
        printers.map((printer) =>
          printer._id === updatedPrinter.data._id
            ? updatedPrinter.data
            : printer
        )
      );
      setSizeUpdated(true);

      setTimeout(() => {
        setEditPrinter(null);
        setSizeUpdated(false);
      }, 1500);
    } else {
      console.error("Failed to edit printer");
    }
  };

  useEffect(() => {
    let charges = editPrinter.charges;
    let updatedCharges =charges.map((charge)=>{
      let tempCharge ={...charge};
      tempCharge.colour={name:charge.colour}
      return tempCharge
    })
    setChargeComponents(updatedCharges)
    firstInputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditPrinter({ ...editPrinter, [name]: value });
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



  //  Charges START


  const handleAddCharge = () => {
    setChargeComponents((prevComponents) => [
      ...prevComponents,
      {
        id: prevComponents.length,
        colour: "",
        minimumCharge: 0,
        plateCharge: 0,
        maxCountPrintPerMinCharge: 0,
        extraChargePerSet: 0,
        minChargeCutOffCount: 0,
      },
    ]);
  };
  const handleSelKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target === lastInputRef.current) {
        handleSubmit();
      } else {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        if (form.elements[index + 2]) {
          form.elements[index + 2].focus();
        }
      }
    }
  };
  const [chargeComponents, setChargeComponents] = useState([]);
  return (
    <div className="fixed inset-0 bg-slate-50 bg-opacity-50 flex items-center px-1 justify-center">
      <div className="bg-white p-4 border-2 shadow-md ">
        <ModalHead heading={"Edit Printer and Charges"} />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center h-full"
        >
          <div className="flex mb-2  relative w-full min-w-[200px]">
            <input
              type="text"
              placeholder="Name"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              name="name"
              value={editPrinter.name}
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
              placeholder="Material"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              name="printingMaterial"
              value={editPrinter.printingMaterial}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Printing Material
            </label>
          </div>

          <p className="text-gray-400 text-xs w-full">
            Max plate/printing size
          </p>
          <div className="flex border flex-row gap-2 p-1 w-full mb-2 rounded-[7px]">
            <div className="flex relative w-1/2 min-w-[100px]">
              <input
                type="number"
                placeholder="Length"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                name="maxLength"
                value={editPrinter.maxLength}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Length
              </label>
            </div>

            <div className="flex   relative w-1/2 min-w-[100px]">
              <input
                type="number"
                placeholder="Breadth"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                name="maxBreadth"
                value={editPrinter.maxBreadth}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Breadth
              </label>
            </div>
          </div>
          <p className="w-full pl-2 pb-2 text-xs text-gray-400 items-start"> Charge breaks</p>
          <div className="w-full">
            {chargeComponents.map((charge, index) => {
              return (
                <Charges
                key={charge.id}
                  id={charge.id}
                  handleKeyDown={handleKeyDown}
                  handleSelKeyDown={handleSelKeyDown}
                  handleAddCharge={handleAddCharge}
                  chargeComponents={chargeComponents}
                  setChargeComponents={setChargeComponents}
                  charge={charge}
                />
              );
            })}
          </div>
          {printerUpdated && (
            <div className="text-sm text-green-500">Printer Updated!</div>
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

export default PrinterEdit;


function Charges({
  id,
  handleKeyDown,
  handleSelKeyDown,
  handleAddCharge,
  chargeComponents,
  setChargeComponents,
  charge,
}) {
  const colours = [
    { name: "Single" },
    { name: "Two Colour" },
    { name: "Three Colour" },
    { name: "Multi" },
  ];
  const minimumChargeInputRef = useRef(null);
  const colorSelectRef = useRef(null);
  const plateChargeInputRef = useRef(null);
  const maxCountPrintPerMinChargeInputRef = useRef(null);
  const extraChargePerSetInputRef = useRef(null);
  const minChargeCutOffCountInputRef = useRef(null);

  const handleColourChange = (id, selectedOption) => {
    setChargeComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id
          ? { ...component, colour: selectedOption }
          : component
      )
    );
    
   
  };
  useEffect(() => {
    if (minimumChargeInputRef.current) {
      minimumChargeInputRef.current.addEventListener("focus", () => {
        minimumChargeInputRef.current.select();
      });
    }

    if (plateChargeInputRef.current) {
      plateChargeInputRef.current.addEventListener("focus", () => {
        plateChargeInputRef.current.select();
      });
    }
    if (maxCountPrintPerMinChargeInputRef.current) {
      maxCountPrintPerMinChargeInputRef.current.addEventListener(
        "focus",
        () => {
          maxCountPrintPerMinChargeInputRef.current.select();
        }
      );
    }
    if (extraChargePerSetInputRef.current) {
      extraChargePerSetInputRef.current.addEventListener("focus", () => {
        extraChargePerSetInputRef.current.select();
      });
    }
    if (minChargeCutOffCountInputRef.current) {
      minChargeCutOffCountInputRef.current.addEventListener("focus", () => {
        minChargeCutOffCountInputRef.current.select();
      });
    }
  }, []);
  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    setChargeComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, [name]: value } : component
      )
    );
  };

  const handleDeleteCharge = (id) => {
    setChargeComponents((prevComponents) => {
      const updatedComponents = prevComponents.filter(
        (component) => component.id !== id
      );
      return updatedComponents.map((component, index) => ({
        ...component,
        id: index,
      }));
    });
  };
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:h-full items-center justify-center">
      <div className="flex mb-2  relative w-full min-w-[250px]">
        <Select
          name="colour"
          options={colours}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          placeholder="Colour"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          ref={colorSelectRef}
          value={charge.colour}
          onChange={(selectedOption) => handleColourChange(id, selectedOption)}
          onKeyDown={handleSelKeyDown}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Colour
        </label>
      </div>
      <div className="flex mb-2  relative w-full min-w-[70px]">
        <input
          type="number"
          placeholder="Minimum Charge"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          name="minimumCharge"
          value={charge.minimumCharge}
          onChange={(event) => handleInputChange(id, event)}
          onKeyDown={handleKeyDown}
          ref={minimumChargeInputRef}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Minimum Charge
        </label>
      </div>
      <div className="flex mb-2  relative w-full min-w-[70px]">
        <input
          type="number"
          placeholder="Plate Charge"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          name="plateCharge"
          value={charge.plateCharge}
          onChange={(event) => handleInputChange(id, event)}
          onKeyDown={handleKeyDown}
          ref={plateChargeInputRef}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Plate Charge
        </label>
      </div>
      <div className="flex mb-2  relative w-full min-w-[70px]">
        <input
          type="number"
          placeholder="Max Print per Min Charge"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          name="maxCountPrintPerMinCharge"
          value={charge.maxCountPrintPerMinCharge}
          onChange={(event) => handleInputChange(id, event)}
          onKeyDown={handleKeyDown}
          ref={maxCountPrintPerMinChargeInputRef}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Max Print per Min Charge
        </label>
      </div>

      <div className="flex mb-2  relative w-full min-w-[70px]">
        <input
          type="number"
          placeholder="Extra Charge per Set"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          name="extraChargePerSet"
          value={charge.extraChargePerSet}
          onChange={(event) => handleInputChange(id, event)}
          onKeyDown={handleKeyDown}
          ref={extraChargePerSetInputRef}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Extra Charge per Set
        </label>
      </div>
      <div className="flex mb-2  relative w-full min-w-[70px]">
        <input
          type="number"
          placeholder="Bulk Print Count"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          name="minChargeCutOffCount"
          value={charge.minChargeCutOffCount}
          onChange={(event) => handleInputChange(id, event)}
          onKeyDown={handleKeyDown}
          ref={minChargeCutOffCountInputRef}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Bulk Print Count
        </label>
      </div>
      <div
        onClick={handleAddCharge}
        className="flex h-full border hover:cursor-pointer border-pink-900 rounded-lg p-2"
      >
        <FaPlus className="text-sm text-pink-900" />
      </div>
      <div
        onClick={() => handleDeleteCharge(id)}
        className="flex h-full border hover:cursor-pointer border-pink-900 rounded-lg p-2"
      >
        <MdDeleteForever className="text-sm text-pink-900" />
      </div>
    </div>
  );
}
