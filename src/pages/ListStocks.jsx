import React, { useState, useEffect } from "react";
import StockCard from "../components/StockCard";
import StockEdit from "../components/StockEdit";
import StockAdd from "../components/StockAdd";
import LoadingStockCard from "../components/LoadingStockCard";
import { API_URL } from "../const/env_constant";

function ListStocks() {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editStock, setEditStock] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + "stocks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      if(jsonResponse.statusCode===401){
        window.location.href='/#login'
      }
      console.log(jsonResponse);
      setStocks(jsonResponse.data);
      setLoading(false);
    };

    fetchStocks();
  }, []);

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

  return (
    <div className="flex h-full  w-full md:w-10/12 overflow-scroll no-scrollbar flex-col gap-2 items-center">
      <div className="flex w-full gap- flex-col shadow-md">
        <div className="flex w-full flex-row text-sm font-medium justify-between text-pink-900 p-2 gap-4 items-center border-2 bg-white shadow-md h-10">
          <p className="flex w-1/3 border-r-2 px-4 justify-center">Item</p>
          <p className="flex w-1/3 border-r-2 px-4 justify-center">Quantity</p>
          <p className="flex w-1/3 px-4 justify-center">Action</p>
        </div>
        {isLoading ? (
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
        ) : (
          stocks.map((stock, index) => (
            <StockCard
              key={index}
              stock={stock}
              handleEdit={handleEdit}
            />
          ))
        )}
        <div className="flex justify-end">
          <button onClick={handleAddStock} className="flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl">
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
