import React, { useState, useEffect, useRef } from "react";
import StockCard from "../components/stock/StockCard";
import StockEdit from "../components/stock/StockEdit";
import StockAdd from "../components/stock/StockAdd";
import LoadingStockCard from "../components/stock/LoadingStockCard";
import { API_URL } from "../const/env_constant";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";

function ListStocks() {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editStock, setEditStock] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);
  const [searchText, setSearchText] = useState("");
  const listInnerRef = useRef();

  const fetchStocks = async (page) => {
    if (page == 1) {
      setLoading(true);
    } else {
      setMoreLoading(true);
    }
    const token = localStorage.getItem("token");
    const url = searchText
      ? `${API_URL}stocks?search=${searchText}&page=${page}`
      : `${API_URL}stocks?page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    setMoreLoading(false);
    if (jsonResponse.statusCode === 401) {
      window.location.href = "/#login";
      return;
    }
    if (jsonResponse.extra) {
      setIsNextPage(!!jsonResponse.extra.nextPage);
    }
    if (searchText) {
      setStocks(jsonResponse.data);
    } else {
      if (page == 1) {
        setStocks(jsonResponse.data);
      } else {
        setStocks((prevStocks) => [...prevStocks, ...jsonResponse.data]);
      }
    }
    setLoading(false);
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

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        !isLoading &&
        isNextPage
      ) {
        fetchStocks(currPage + 1);
        setCurrPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setStocks([]);
    setCurrPage(1);
    setIsNextPage(true);
    if (value.trim() !== "") {
      fetchStocks(1);
    } else {
      fetchStocks(1);
    }
  };

  useEffect(() => {
    fetchStocks(currPage);
  }, [currPage]); // Trigger fetchStocks when currPage changes

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className="flex h-full  w-full overflow-scroll no-scrollbar flex-col items-center"
    >
      <div className="flex w-full flex-col shadow-md">
        <div className="flex flex-col pt-2 md:flex-row gap-2 items-center justify-center text-pink-900 w-full  border-2">
          <div className="flex-row flex">
            <SiPrintables fontSize={24} />
            <p className="quantico-regular  px-3">Stocks</p>
          </div>
          <div className="relative w-full md:w-auto flex p-2">
            <SearchItems fetcher={handleSearch} />
          </div>
        </div>
        <div className="flex w-full flex-row text-sm font-medium justify-between text-pink-900  items-center border-2 bg-white shadow-md h-10">
          <p className="flex h-full items-center w-1/3 border-r-2  justify-center">Item</p>
          <p className="flex h-full items-center w-1/3 border-r-2  justify-center">Quantity</p>
          <p className="flex h-full items-center w-1/3  justify-center">Action</p>
        </div>
        {!isLoading ? (
          stocks.map((stock, index) => (
            <StockCard key={index} stock={stock} handleEdit={handleEdit} />
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
        {isMoreLoading && (
          <>
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
            <LoadingStockCard />
          </>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleAddStock}
            className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
          >
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <StockAdd
          handleModalClose={handleModalClose}
          stocks={stocks}
          setStocks={setStocks}
          setShowModal={setShowModal}
        />
      )}

      {editStock && (
        <StockEdit
          setEditStock={setEditStock}
          editStock={editStock}
          handleModalClose={handleModalClose}
          setStocks={setStocks}
          stocks={stocks}
        />
      )}
    </div>
  );
}

export default ListStocks;
