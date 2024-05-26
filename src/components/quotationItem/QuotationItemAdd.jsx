import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { API_URL } from "../../const/env_constant";
import { IoMdAdd } from "react-icons/io";
import { RxReset } from "react-icons/rx";
API_URL;
function QuotationItemAdd({
  quotationID,
  setSelectedPrinters,
  selPrinters
}) {
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
    gsm: "",
    count: "",
    testcount: "",
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
      if (jsonResponse.data.length >= 1) {
        setPageSizes(jsonResponse.data);
      } else {
        const lengthAndBreadth = search.split(/x|X/);
        if (lengthAndBreadth.length == 2) {
          setNewQuotationItem({
            ...newQuotationItem,
            ["size"]: {
              _id: "custom",
              name: lengthAndBreadth[0] + "X" + lengthAndBreadth[1],
              dimention_length: lengthAndBreadth[0],
              dimention_breadth: lengthAndBreadth[1],
            },
          });
        }
      }
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
    console.log(selectedOption);
    setNewQuotationItem({ ...newQuotationItem, ["item"]: selectedOption });
  };
  const handlePrinterChange = (selectedOption) => {
    setNewQuotationItem({ ...newQuotationItem, ["printer"]: selectedOption });
  };
  const handleSizeChange = (selectedOption) => {
    setNewQuotationItem({ ...newQuotationItem, ["size"]: selectedOption });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewQuotationItem({ ...newQuotationItem, [name]: value });
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
  const handlePartialSubmit = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `quotations/add/${quotationID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newQuotationItem),
    });
    if (response.ok) {
      const responseQuotationItem = await response.json();
      const slectedPrinters = responseQuotationItem;
      console.log("response :", responseQuotationItem);
      setSelectedPrinters([])
      storeSelectedPrinters(slectedPrinters);
    } else {
      console.error("Failed to add stock");
    }
  };

  const storeSelectedPrinters = (selectedPrinters) => {
    selectedPrinters.forEach((selectedPrinter) => {
      let pLength = 0;
      let pBreadth = 0;
      let vLength = 0;
      let vLengthP = 0;
      let vWaste = 0;
      let vWasteP = 0;
      let vCount = 0;
      let hLength = 0;
      let hLengthP = 0;
      let hWaste = 0;
      let hWasteP = 0;
      let hCount = 0;
    
      vWaste = selectedPrinter.printLayout.dawnWaste;
      vWasteP = Math.ceil((vWaste * 100) / selectedPrinter.printer.maxBreadth);
      vLength = selectedPrinter.printLayout.dawnLength;
      vLengthP = 100 - vWasteP;
    
      vCount = selectedPrinter.printLayout.dawnCount;
      hWaste = selectedPrinter.printLayout.rightWaste;
      hWasteP = Math.ceil((hWaste * 100) / selectedPrinter.printer.maxBreadth);
      hLength = selectedPrinter.printLayout.rightLength;
      hLengthP = 100 - hWasteP;
      hCount = selectedPrinter.printLayout.rightCount;
      let printerAndDetails = {
        printer: selectedPrinter.printer,
        pageLayout: {
          vLength,
          vLengthP,
          vWaste,
          vWasteP,
          vCount,
          hLength,
          hLengthP,
          hWaste,
          hWasteP,
          hCount,
          
        },
        amount: selectedPrinter.amount,
      };
      setSelectedPrinters([printerAndDetails, ...selPrinters]);
    });
    
    
    
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
            placeholder="GSM"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            name="gsm"
            value={newQuotationItem.gsm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            GSM
          </label>
        </div>

        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <input
            type="number"
            placeholder="Count"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            name="count"
            value={newQuotationItem.count}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            No of print
          </label>
        </div>

        <div className="flex mb-2  relative w-full  md:max-w-[100px]">
          <input
            type="number"
            placeholder="Count"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            name="testcount"
            value={newQuotationItem.testcount}
            onChange={handleInputChange}
            onKeyDown={handlePartialSubmit}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Test count
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
            value={newQuotationItem.testcount}
            onChange={handlePrinterChange}
            onKeyDown={handleKeyDownselect}
            onInputChange={searchPrinter}
            //
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
            value={newQuotationItem.amount}
            onChange={handleInputChange}
            ref={lastInputRef}
            onKeyDown={handleKeyDown}
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
