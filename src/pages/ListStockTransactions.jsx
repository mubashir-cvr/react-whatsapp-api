import React, { useState, useEffect, useRef } from "react";
import LoadingStockCard from "../components/stock/LoadingStockCard";
import { API_URL } from "../const/env_constant";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
import StockTransactionCard from "../components/stocktransaction/StockTransactionCard";
import StockTransactionEdit from "../components/stocktransaction/StockTransactionEdit";
import { useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
function ListStockTransactions() {
  const [StockTransactions, setStockTransactions] = useState([]);
  const [editStock, setEditStock] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();
  const { createPermission, updatePermission, deletePermission } =
    getPermittedActionsOfUserForObject("StockTransaction");

  useEffect(() => {
    fetchStockTransactions(1);
    const targetDiv = document.getElementById("container");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const { itemID } = useParams();
  const decodedItemID = atob(itemID);

  const fetchStockTransactions = async (page) => {
    if (page === 1) {
      setStockTransactions([]);
    } else {
      setMoreLoading(true);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_URL + `stockshistory/${decodedItemID}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.extra) {
        setIsNextPage(jsonResponse.extra.nextPage !== null);
        setCurrentPage(jsonResponse.extra.currentPage);
      }

      const logoutTimeout = setTimeout(() => {
        setStockTransactions((prevItems) => [
          ...jsonResponse.data,
          ...prevItems,
        ]);
        setMoreLoading(false);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(logoutTimeout);
    } catch (error) {
      console.error("Error fetching stock history:", error);
    }
  };

  const onScroll = () => {
    const listInnerElem = listInnerRef.current;
    if (listInnerElem.scrollTop === 0 && isNextPage) {
      setMoreLoading(true);
      fetchStockTransactions(currentPage + 1);
    }
  };

  const handleModalClose = () => {
    setEditStock(null);
  };

  const handleEdit = (stock) => {
    setEditStock(stock);
  };

  const deleteStockTransaction = async (StockTransactionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_URL + `/StockTransactions/${StockTransactionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setStockTransactions((prevItems) =>
          prevItems.filter((item) => item._id !== StockTransactionId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (StockTransactionId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteStockTransaction(StockTransactionId);
    }
  };

  return (
    <div
      id="stockContainer"
      className="flex h-full w-full overflow-y-auto no-scrollbar flex-col items-center"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="flex flex-col pt-2 md:flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-14 md:min-h-20 border-2">
        <div className="flex-row flex gap-3">
          <div
            className="flex justify-start animate-pulse text-pink-900"
            onClick={() => {
              window.history.back();
            }}
          >
            <IoArrowBackSharp />
          </div>
          <SiPrintables fontSize={24} />
          <p className="quantico-regular  px-3">Stock History</p>
        </div>
      </div>
      <div className="flex w-full  flex-col">
        <div className="flex w-full font-bold flex-row text-xs h-10 md:text-sm justify-between text-pink-900   items-center border bg-white shadow-md">
          <p className="flex w-2/6  md:w-1/6 h-full items-center border-r-2  justify-center">
            Date
          </p>
          <p className="flex w-2/6 md:w-1/6 border-r-2  justify-center">
            Item Name
          </p>
          <p className="hidden md:flex w-2/6 h-full items-center md:w-1/6 border-r-2  justify-center">
            Item type
          </p>
          <p className="flex w-1/6 h-full items-center md:w-1/6 border-r-2  justify-center">
            Qty
          </p>
          <p className="flex w-2/6 h-full items-center md:w-1/6 border-r-2  justify-center">
            Type
          </p>
          <p className="hidden md:flex w-1/6 h-full items-center md:w-1/6 border-r-2  justify-center">
            User
          </p>

          <p className="hidden  md:flex w-1/6 h-full items-center md:w-1/6 border-r-2  justify-center">
            Action
          </p>
        </div>
        {isMoreLoading && <LoadingStockCard />}
        {!isLoading ? (
          StockTransactions.map((StockTransaction, index) => (
            <StockTransactionCard
              key={index}
              StockTransaction={StockTransaction}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        ) : (
          <>
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
          </>
        )}
        <div id="container"></div>
      </div>

      {editStock && (
        <StockTransactionEdit
          setEditStock={setEditStock}
          editStock={editStock}
          handleModalClose={handleModalClose}
          setStockTransactions={setStockTransactions}
          StockTransactions={StockTransactions}
        />
      )}
    </div>
  );
}

export default ListStockTransactions;
