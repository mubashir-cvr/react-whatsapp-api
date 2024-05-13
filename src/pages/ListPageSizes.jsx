import React, { useState, useEffect, useRef } from "react";
import PageSizeEdit from "../components/pageSize/PageSizeEdit";
import LoadingPageSizeCard from "../components/pageSize/LoadingPageSizeCard";
import { API_URL } from "../const/env_constant";
import PageSizeCard from "../components/pageSize/PageSizeCard";
import PageSizeAdd from "../components/pageSize/PageSizeAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
function ListPageSizes() {
  const [pageSizes, setPageSizes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPageSize, setEditPageSize] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();
  const { createPermission, updatePermission, deletePermission } = getPermittedActionsOfUserForObject("PageSize");
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {

    fetchPageSizes(1);
  }, []);

  const fetchPageSizes = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `pagesizes?page=${page}`, {
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
        setPageSizes([]);
      }
      setMoreLoading(false);

      setPageSizes((prevItems) => [...prevItems, ...jsonResponse.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };
  const fetchSearchPageSizes = async (search) => {
    if (search) {
      setIsSearched(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `pagesizes?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      setPageSizes(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      setIsSearched(false);
      fetchPageSizes(1);
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
      fetchPageSizes(currentPage + 1);
    }
  };

  const handleAddPageSize = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditPageSize(null);
  };

  const handleEdit = (stock) => {
    setEditPageSize(stock);
  };

  const deletePageSize = async (pageSizeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL + `/pagesizes/${pageSizeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPageSizes((prevItems) =>
          prevItems.filter((item) => item._id !== pageSizeId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (pageSizeId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deletePageSize(pageSizeId);
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
          <p className="quantico-regular  px-3">Page Size</p>
        </div>
        <div className="relative w-full md:w-auto flex p-2">
          <SearchItems fetcher={fetchSearchPageSizes} />
        </div>
      </div>
      <div className="flex w-full  flex-col">
        <div className="flex w-full flex-row text-xs md:text-sm font-medium justify-between text-pink-900  items-center border bg-white shadow-md h-full">
          <p className="flex w-1/3  border-r-2  h-full justify-center">
            Name
          </p>
          <p className="w-1/3  md:flex border-r-2  h-full justify-center">
            Dimension
          </p>
          <p className="flex w-1/3  border-r-2  h-full justify-center">
            Action
          </p>
        </div>
        {!isLoading ? (
          pageSizes.map((pageSize, index) => (
            <PageSizeCard
              key={index}
              pageSize={pageSize}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              deletePermission={deletePermission}
              updatePermission={updatePermission}
            />
          ))
        ) : (
          <>
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
          </>
        )}
        {isMoreLoading && (
          <>
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
            <LoadingPageSizeCard />
          </>
        )}
        <div className="flex justify-end">
          <button onClick={handleAddPageSize} className={add_button}>
            <p className="text-zinc-50">+</p>
          </button>
        </div>
      </div>

      {showModal && (
        <PageSizeAdd
          handleModalClose={handleModalClose}
          setPageSizes={setPageSizes}
          setShowModal={setShowModal}
        />
      )}

      {editPageSize && (
        <PageSizeEdit
          setEditPageSize={setEditPageSize}
          editPageSize={editPageSize}
          handleModalClose={handleModalClose}
          setPageSizes={setPageSizes}
          pageSizes={pageSizes}
        />
      )}
    </div>
  );
}

export default ListPageSizes;
