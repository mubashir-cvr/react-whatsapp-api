import React, { useState, useEffect, useRef } from "react";
import StockItemsEdit from "../components/StockItemsEdit";
import LoadingStockCard from "../components/LoadingStockCard";
import { API_URL } from "../const/env_constant";
import StockItemCard from "../components/StockItemCard";
import StockItemAdd from "../components/StockItemAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/SearchItems";
function ListStockItems() {
  const [stockItems, setStockItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editStock, setEditStock] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();

  const [userPermissions, setUserPermissions] = useState([]);
  let createPermission = userPermissions.some((permission) =>
    ["createStockItem", "allAccess", "allAccessToStockItem"].some(
      (reqAccess) => reqAccess === permission
    )
  );
  let updatePermission = userPermissions.some((permission) =>
    ["updateStockItem", "allAccess", "allAccessToStockItem"].some(
      (reqAccess) => reqAccess === permission
    )
  );

  let deletePermission = userPermissions.some((permission) =>
    ["deleteStockItem", "allAccess", "allAccessToStockItem"].some(
      (reqAccess) => reqAccess === permission
    )
  );
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {
    const userPermission = localStorage.getItem("userPermissions");
    setUserPermissions(JSON.parse(userPermission).permissions);

    fetchStockItems(1);
  }, []);
 
  const fetchStockItems = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `stockitems?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.extra) {
        setIsNextPage(jsonResponse.extra.nextPage !== null);
        setCurrentPage(jsonResponse.extra.currentPage);
      }
      if(page===1){
        setStockItems([])
      }
      setStockItems((prevItems) => [...prevItems, ...jsonResponse.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };
  const fetchSearchStockItems = async (search) => {
    if (search) {
      setIsSearched(true)
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `stockitems?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setStockItems(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      setIsSearched(false)
      fetchStockItems(1);
    }
  };

  const onScroll = () => {
    const listInnerElem = listInnerRef.current;
    if (
      listInnerElem.scrollTop + listInnerElem.clientHeight ===
        listInnerElem.scrollHeight &&
      isNextPage
    ) { 
      setLoading(true)
    alert("Onscroll")
      fetchStockItems(currentPage + 1);
    }
  };

  const handleAddStock = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditStock(null);
  };

  const handleEdit = (stock) => {
    setEditStock(stock);
  };

  const deleteStockItem = async (stockItemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `/stockitems/${stockItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setStockItems((prevItems) =>
          prevItems.filter((item) => item._id !== stockItemId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (stockItemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteStockItem(stockItemId);
    }
  };
  
  return (
    <div
      className="flex h-full w-full md:w-10/12 overflow-scroll no-scrollbar flex-col items-center"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="flex flex-col pt-2 md:flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-28 border-2">
       <div className="flex-row flex"><SiPrintables fontSize={24} />
        <p className="quantico-regular  px-3">Stock Items</p>
        </div> 
        <div className="relative w-full md:w-auto flex p-2">
          <SearchItems fetcher={fetchSearchStockItems} />
        </div>
      </div>
      <div className="flex w-full  flex-col">
        <div className="flex w-full flex-row text-xs md:text-sm font-medium justify-between text-pink-900  gap-4 items-center border bg-white shadow-md h-10">
          <p className="flex w-2/4 md:w-1/6 border-r-2 px-4 justify-center">Item Name</p>
          <p className="flex w-1/4 md:w-1/6 border-r-2 px-4 justify-center">Item type</p>
          <p className="flex w-1/4 md:w-1/6 border-r-2 px-4 justify-center">GSM</p>
          <p className="hidden w-1/4 md:w-1/6 md:flex border-r-2 px-4 justify-center">
            Dimension
          </p>
          <p className="hidden md:flex w-1/4 md:w-1/6 border-r-2 px-4 justify-center">
            Unit
          </p>
          <p className="flex w-1/4 md:w-1/6 border-r-2 px-4 justify-center">Action</p>
        </div>
        {!isLoading ? (
          (
            stockItems.map((stockItem, index) => (
              <StockItemCard
                key={index}
                stockItem={stockItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                deletePermission={deletePermission}
                updatePermission={updatePermission}
              />
            ))
          )
          
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
        <div className="flex justify-end">
          <button onClick={handleAddStock} className={add_button}>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <StockItemAdd
          handleModalClose={handleModalClose}
          stockItems={stockItems}
          setStockItems={setStockItems}
          setShowModal={setShowModal}
        />
      )}

      {editStock && (
        <StockItemsEdit
          setEditStock={setEditStock}
          editStock={editStock}
          handleModalClose={handleModalClose}
          setStockItems={setStockItems}
          stockItems={stockItems}
        />
      )}
    </div>
  );
}

export default ListStockItems;
