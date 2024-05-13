import React, { useState, useEffect, useRef } from "react";
import PrinterEdit from "../components/printer/PrinterEdit";
import LoadingPrinterCard from "../components/printer/LoadingPrinterCard";
import { API_URL } from "../const/env_constant";
import PrinterCard from "../components/printer/PrinterCard";
import PrinterAdd from "../components/printer/PrinterAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
function ListPrinters() {
  const [printers, setPrinters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPrinter, setEditPrinter] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();
  const { createPermission, updatePermission, deletePermission } = getPermittedActionsOfUserForObject("Printer");
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {

    fetchPrinters(1);
  }, []);

  const fetchPrinters = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `printers?page=${page}`, {
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
        setPrinters([]);
      }
      setMoreLoading(false);
      console.log(jsonResponse)
      setPrinters((prevItems) => [...prevItems, ...jsonResponse.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };
  const fetchSearchPrinters = async (search) => {
    if (search) {
      setIsSearched(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `printers?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setPrinters(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      setIsSearched(false);
      fetchPrinters(1);
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
      fetchPrinters(currentPage + 1);
    }
  };

  const handleAddPrinter = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditPrinter(null);
  };

  const handleEdit = (stock) => {
    setEditPrinter(stock);
  };

  const deletePrinter = async (printerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `/printers/${printerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPrinters((prevItems) =>
          prevItems.filter((item) => item._id !== printerId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (printerId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deletePrinter(printerId);
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
          <p className="quantico-regular  px-3">Printers</p>
        </div>
        <div className="relative w-full md:w-auto flex p-2">
          <SearchItems fetcher={fetchSearchPrinters} />
        </div>
      </div>
      <div className="flex w-full  flex-col">
        <div className="flex w-full flex-row text-xs md:text-sm font-medium justify-between text-pink-900  items-center border bg-white shadow-md h-full">
          <p className="flex w-1/6  border-r-2  h-full justify-center">
            Name
          </p>
          <p className="hidden w-1/6  md:flex border-r-2  h-full justify-center">
            Dimension
          </p>
          <p className="flex w-1/6  border-r-2  h-full justify-center">
            Minimum Charge
          </p>
          <p className="flex w-1/6  border-r-2  h-full justify-center">
            Extra Charge
          </p>
          <p className="flex w-1/6  border-r-2  h-full justify-center">
            Minimum cut off count
          </p>
          <p className="flex w-1/6  border-r-2  h-full justify-center">
            Action
          </p>
        </div>
        {!isLoading ? (
          printers.map((printer, index) => (
            <PrinterCard
              key={index}
              printer={printer}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        ) : (
          <>
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
          </>
        )}
        {isMoreLoading && (
          <>
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
            <LoadingPrinterCard />
          </>
        )}
        <div className="flex justify-end">
          <button onClick={handleAddPrinter} className={add_button}>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <PrinterAdd
          handleModalClose={handleModalClose}
          setPrinters={setPrinters}
          setShowModal={setShowModal}
        />
      )}

      {editPrinter && (
        <PrinterEdit
          setEditPrinter={setEditPrinter}
          editPrinter={editPrinter}
          handleModalClose={handleModalClose}
          setPrinters={setPrinters}
          printers={printers}
        />
      )}
    </div>
  );
}

export default ListPrinters;
