import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { API_URL } from "../../const/env_constant";
import { IoMdAdd } from "react-icons/io";
import { RxReset } from "react-icons/rx";
API_URL;
function QuotationItemAdd() {
  const items = [{ name: "Printing" }, { name: "Design" }, { name: "Other" }];

  const [pageSizes, setPageSizes] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [pageSize, setPageSize] = useState(null);
  const [printer, setPrinter] = useState(null);

  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const [newQuotationItem, setNewQuotationItem] = useState({
    item: "",
    size: "",
    count: "",
    printer: "",
    amount: "",
  });
  const fetchSearchPageSizes = async (search) => {
    if (search) {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `pagesizes?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setPageSizes(jsonResponse.data);
    }
  };
  const searchSize = (value) => {
    fetchSearchPageSizes(value);
  };

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
    fetchSearchPageSizes(" ");
    fetchSearchPrinters(" ");
    firstInputRef.current.focus();
  }, []);
  const handleItemChange = (selectedOption) => {
    setNewQuotationItem({ ...newQuotationItem, ["item"]: selectedOption });
  };
  const handleSizeChange = (selectedOption) => {
    setNewQuotationItem({ ...newQuotationItem, ["size"]: selectedOption });
  };
  const handleKeyDownselect = (event) => {
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
    <div className="w-full">
      <form
        className="flex flex-col  md:flex-row px-4 justify-between w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <Select
            name="item"
            required
            options={items}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.name}
            placeholder="Item"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent  font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            value={newQuotationItem.item}
            onChange={handleItemChange}
            onKeyDown={handleKeyDownselect}
            ref={firstInputRef}
          />

          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Item
          </label>
        </div>

        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <Select
            name="size"
            required
            options={pageSizes}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Size"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent  font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            value={newQuotationItem.size}
            onChange={handleSizeChange}
            onKeyDown={handleKeyDownselect}
            onInputChange={searchSize}
            // ref={lastInputRef}
          />

          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Size
          </label>
        </div>
        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <input
            type="number"
            placeholder="Count"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            name="count"
            // value={newPageSize.name}
            // ref={firstInputRef}
            // onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            No of print
          </label>
        </div>

        <div className="flex mb-2  relative w-full  md:max-w-[150px]">
          <Select
            name="printer"
            options={printers}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            placeholder="Printer"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent  font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            // value={newQuotation.customer}
            // onChange={handleInputChange}
            onKeyDown={handleKeyDownselect}
            onInputChange={searchSize}
            // ref={lastInputRef}
          />

          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Printer
          </label>
        </div>

        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <input
            type="number"
            placeholder="Amount"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            name="amount"
            // value={newPageSize.name}
            // ref={firstInputRef}
            // onChange={handleInputChange}
            // onKeyDown={handleKeyDown}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Amount
          </label>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex mb-3 bg-pink-800 rounded-[7px] relative w-full  md:max-w-[50px]">
            <div className="peer flex items-center justify-center  h-full w-full rounded-[7px] border border-pink-900 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-pink-900 placeholder-shown:border-t-2 placeholder-shown:border-t-pink-900 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100">
              <IoMdAdd className="text-sm font-extrabold text-white" />
            </div>
          </div>
          <div className="flex mb-3 bg-pink-800 rounded-[7px]  relative w-full  md:max-w-[50px]">
            <div className="peer flex items-center justify-center  h-full w-full rounded-[7px] border border-pink-900 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-pink-900 placeholder-shown:border-t-2 placeholder-shown:border-t-pink-900 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100">
              <RxReset className="text-sm font-extrabold text-white" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuotationItemAdd;
