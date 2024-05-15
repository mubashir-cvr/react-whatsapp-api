import React, { useState, useEffect, useRef } from "react";
import QuotationEdit from "../components/quotation/QuotationEdit";
import LoadingQuotationCard from "../components/quotation/LoadingQuotationCard";
import { API_URL } from "../const/env_constant";
import QuotationCard from "../components/quotation/QuotationCard";
import QuotationAdd from "../components/quotation/QuotationAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
function ListQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editQuotation, setEditQuotation] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();
  const { createPermission, updatePermission, deletePermission } = getPermittedActionsOfUserForObject("Quotation");
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {

    fetchQuotations(1);
  }, []);

  const fetchQuotations = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `quotations?page=${page}`, {
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
        setQuotations([]);
      }
      setMoreLoading(false);

      setQuotations((prevItems) => [...prevItems, ...jsonResponse.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };
  const fetchSearchQuotations = async (search) => {
    if (search) {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `quotations?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setQuotations(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      fetchQuotations(1);
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
      fetchQuotations(currentPage + 1);
    }
  };

  const handleAddQuotation = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditQuotation(null);
  };

  const handleEdit = (stock) => {
    setEditQuotation(stock);
  };

  const deleteQuotation = async (quotationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `/quotations/${quotationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setQuotations((prevItems) =>
          prevItems.filter((item) => item._id !== quotationId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (quotationId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteQuotation(quotationId);
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
          <p className="quantico-regular  px-3">Quotations</p>
        </div>
        <div className="relative w-full md:w-auto flex p-2">
          <SearchItems fetcher={fetchSearchQuotations} />
        </div>
      </div>
      <div className="flex w-full  flex-col gap-1">
        <div className="flex w-full flex-row text-xs md:text-sm font-medium justify-between text-pink-900  items-center border bg-white shadow-md h-full">
          <p className="flex w-1/3 md:w-1/4 items-center  border-r-2  h-full justify-center">
            Quotation Number
          </p>
          <p className="flex w-1/3 md:w-1/4 items-center  md:flex border-r-2  h-full justify-center">
            Customer
          </p>
          <p className="hidden md:flex w-1/3 md:w-1/4 items-center border-r-2  h-full justify-center">
            Created
          </p>
          <p className="flex w-1/3 md:w-1/4 items-center  border-r-2  h-full justify-center">
            Action
          </p>
        </div>
        {!isLoading ? (
          quotations.map((quotation, index) => (
            <QuotationCard
              key={index}
              quotation={quotation}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        ) : (
          <>
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
          </>
        )}
        {isMoreLoading && (
          <>
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
            <LoadingQuotationCard />
          </>
        )}
        <div className="flex justify-end">
          <button onClick={handleAddQuotation} className={add_button}>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <QuotationAdd
          handleModalClose={handleModalClose}
          setQuotations={setQuotations}
          setShowModal={setShowModal}
        />
      )}

      {editQuotation && (
        <QuotationEdit
          setEditQuotation={setEditQuotation}
          editQuotation={editQuotation}
          handleModalClose={handleModalClose}
          setQuotations={setQuotations}
          quotations={quotations}
        />
      )}
    </div>
  );
}

export default ListQuotations;
