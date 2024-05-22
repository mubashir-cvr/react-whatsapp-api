import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { API_URL } from "../../const/env_constant";
import ModalHead from "../common/ModalHead";

function QuotationAdd({ handleModalClose, setQuotations }) {
  const [newQuotation, setNewQuotation] = useState({
    customer: null,
  });
  const [quotationAdded, setQuotationAdded] = useState(false);
  const [customers, setCustomers] = useState([]);
  const firstInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const handleInputChange = (selectedOption) => {
    setNewQuotation({customer: selectedOption });

    console.log(newQuotation)
  };

  const fetchSearchCustomers = async (search) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + `customers?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    setCustomers(jsonResponse.data);
    const logoutTimeout = setTimeout(() => {}, 500);
    return () => clearTimeout(logoutTimeout);
  };

  useEffect(() => {
    fetchSearchCustomers("");
    lastInputRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    const customerId = newQuotation.customer ? newQuotation.customer._id : null;
    const quotationData = {
      ...newQuotation,
      customer: customerId,
    };
    console.log(quotationData)
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "quotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quotationData),
    });
    if (response.ok) {
      const createdQuotation = await response.json();

      console.log(createdQuotation)
      setQuotations((previosQuotations) => [
        ...previosQuotations,
        createdQuotation.data,
      ]);

      setNewQuotation({
        customer: null,
      });
      setQuotationAdded(true);

      setTimeout(() => {
        setQuotationAdded(false);
      }, 1500);

      lastInputRef.current.focus();
    } else {
      console.error("Failed to add quotation");
    }
  };
  const searchItems = (value) => {
    fetchSearchCustomers(value);
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
        <ModalHead heading={"Create Quotation"} />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center h-full"
        >
          <div className="flex mb-2  relative w-full min-w-[200px]">
            <Select
              name="customer"
              options={customers}
              getOptionLabel={(option) =>
                option.name + " - " + option.phoneNumber
              }
              getOptionValue={(option) => option._id}
              placeholder="Select Customer"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-2 bg-transparent px-3 py-2.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-2 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:border-t-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              value={newQuotation.customer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onInputChange={searchItems}
              ref={lastInputRef}
            />

            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Customer
            </label>
          </div>

          {quotationAdded && (
            <div className="text-sm text-green-500">Quotation Created</div>
          )}
          <div className="flex justify-center p-4">
            <div
              className="px-4 py-2 text-pink-900 border-2 rounded-md mr-2"
              onClick={handleSubmit}
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

export default QuotationAdd;
