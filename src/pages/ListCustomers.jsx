import React, { useState, useEffect, useRef } from "react";
import CustomerEdit from "../components/customer/CustomerEdit";
import LoadingCustomerCard from "../components/customer/LoadingCustomerCard";
import { API_URL } from "../const/env_constant";
import CustomerCard from "../components/customer/CustomerCard";
import CustomerAdd from "../components/customer/CustomerAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
function ListCustomers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();
  const { createPermission, updatePermission, deletePermission } = getPermittedActionsOfUserForObject("Customer");
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {

    fetchCustomers(1);
  }, []);

  const fetchCustomers = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `customers?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.extra) {
        setIsNextPage(jsonResponse.extra.nextPage !== null);
        setCurrentPage(jsonResponse.extra.currentPage);
      }
      if (page === 1) {
        setCustomers([]);
      }
      setMoreLoading(false);

      setCustomers((prevItems) => [...prevItems, ...jsonResponse.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer items:", error);
    }
  };
  const fetchSearchCustomers = async (search) => {
    if (search) {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `customers?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setCustomers(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      fetchCustomers(1);
    }
  };

  const onScroll = () => {
    const listInnerElem = listInnerRef.current;
    if (
      listInnerElem.scrollTop + listInnerElem.clientHeight ===
        listInnerElem.scrollHeight &&
      isNextPage
    ) {
      setMoreLoading(true);
      fetchCustomers(currentPage + 1);
    }
  };

  const handleAddCustomer = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditCustomer(null);
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
  };

  const deleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `/customers/${customerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCustomers((prevItems) =>
          prevItems.filter((item) => item._id !== customerId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting customer item:", error);
    }
  };

  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteCustomer(customerId);
    }
  };

  return (
    <div
      className="flex h-full w-full overflow-scroll no-scrollbar flex-col items-center"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="flex flex-col pt-2 md:flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-28 border-2">
        <div className="flex-row flex">
          <SiPrintables fontSize={24} />
          <p className="quantico-regular  px-3">Customers</p>
        </div>
        <div className="relative w-full md:w-auto flex p-2">
          <SearchItems fetcher={fetchSearchCustomers} />
        </div>
      </div>
      <div className="flex w-full md:w-4/6 flex-col gap-1 pt-1">
        
        {!isLoading ? (
          customers.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        ) : (
          <>
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
          </>
        )}
        {isMoreLoading && (
          <>
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
            <LoadingCustomerCard />
          </>
        )}
        <div className="flex justify-end">
          <button onClick={handleAddCustomer} className={add_button}>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <CustomerAdd
          handleModalClose={handleModalClose}
          setCustomers={setCustomers}
          setShowModal={setShowModal}
        />
      )}

      {editCustomer && (
        <CustomerEdit
          setEditCustomer={setEditCustomer}
          editCustomer={editCustomer}
          handleModalClose={handleModalClose}
          setCustomers={setCustomers}
          customers={customers}
        />
      )}
    </div>
  );
}

export default ListCustomers;
