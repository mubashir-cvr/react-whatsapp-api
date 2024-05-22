import React, { useState, useEffect, useRef } from "react";
import QuotationItemEdit from "../components/quotationItem/QuotationItemEdit";
import LoadingQuotationItemCard from "../components/quotationItem/LoadingQuotationItemCard";
import { API_URL } from "../const/env_constant";
import QuotationItemCard from "../components/quotationItem/QuotationItemCard";
import QuotationItemAdd from "../components/quotationItem/QuotationItemAdd";
import { SiPrintables } from "react-icons/si";
import SearchItems from "../components/common/SearchItems";
import { useParams } from "react-router-dom";
import { getPermittedActionsOfUserForObject } from "../utils/getUserpersmissions";
function ListQuotationItems() {
  const { quotationID } = useParams();
  const [quotationItem, setQuotationItems] = useState([]);
  const [quotation, setQuotation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editQuotationItem, setEditQuotationItem] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(true);
  const listInnerRef = useRef();

  const { createPermission, updatePermission, deletePermission } =
    getPermittedActionsOfUserForObject("QuotationItem");
  let add_button = createPermission
    ? "flex fixed right-6 bottom-16 md:right-24 md:bottom-24 rounded-full font-thin bg-pink-800 w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl shadow-xl hover:bg-pink-900 hover:text-3xl"
    : "hidden";

  useEffect(() => {
    fetchQuotationItems(1);
  }, []);

  const fetchQuotationItems = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_URL + `quotations/${quotationID}?page=${page}`,
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
      if (page === 1) {
        setQuotationItems([]);
      }
      setMoreLoading(false);
      console.log(jsonResponse.data.quotation);
      setQuotation(jsonResponse.data.quotation);
      // setQuotationItems((prevItems) => [...prevItems, ...jsonResponse.data]);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };
  const fetchSearchQuotationItems = async (search) => {
    if (search) {
      setIsSearched(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_URL + `quotations/${quotationID}?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      setQuotationItems(jsonResponse.data);
      const logoutTimeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(logoutTimeout);
    } else {
      setIsSearched(false);
      fetchQuotationItems(1);
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
      fetchQuotationItems(currentPage + 1);
    }
  };

  const handleAddQuotationItem = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditQuotationItem(null);
  };

  const handleEdit = (stock) => {
    setEditQuotationItem(stock);
  };

  const deleteQuotationItem = async (quotationItemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_URL + `/quotationitems/${quotationItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setQuotationItems((prevItems) =>
          prevItems.filter((item) => item._id !== quotationItemId)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleDelete = (quotationItemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteQuotationItem(quotationItemId);
    }
  };
  return (
    <div className="flex flex-row h-full w-full ">
      <div className="flex flex-1 h-full">
        <div className="flex  flex-col h-full w-full">
          <div className="flex border-2 bg-slate-100  items-center justify-center">
            <div className="flex px-4 py-1 flex-row items-center h-full w-full">
              <div className="flex min-w-20 md:min-w-36 h-8 text-pink-900 rounded-lg border justify-center text-sm font-medium items-center bg-white">
                {quotation && quotation.qoutationNumber}
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-row items-center justify-center text-pink-900 w-full min-h-12">
                  <SiPrintables fontSize={24} />
                  <p className="quantico-regular  px-3">Quotation</p>
                </div>
              </div>
              <div className="hidden md:flex p-2 font-medium w-full justify-end items-center h-full">
                <div className="flex flex-col justify-center  py-2 px-2 w-56 rounded-lg border text-pink-900 bg-white gap-1 items-center h-full">
                  <div className="flex w-full items-center flex-row gap-1">
                    <div className="flex w-full items-center justify-center text-xs">
                      {quotation &&
                        new Date(quotation.updated_at).toLocaleDateString([], {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }) +
                          "-" +
                          new Date(quotation.updated_at).toLocaleTimeString(
                            [],
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                    </div>
                  </div>
                  <div className="flex  w-full flex-row gap-1">
                    <div className="flex w-1/3 text-xs ">Customer </div>
                    <div className="flex  text-xs justify-center">: </div>
                    <div className="flex w-1/3 text-xs">
                      {quotation &&
                        quotation.customer &&
                        quotation.customer.name}
                    </div>
                  </div>
                  <div className="flex  w-full flex-row gap-1">
                    <div className="flex w-1/3 text-xs ">Phone </div>
                    <div className="flex  text-xs justify-center">: </div>
                    <div className="flex w-1/3 text-xs">
                      {quotation &&
                        quotation.customer &&
                        quotation.customer.phoneNumber}
                    </div>
                  </div>
                  <div className="flex  w-full flex-row gap-1">
                    <div className="flex w-1/3 text-xs ">Address </div>
                    <div className="flex text-xs justify-center">: </div>
                    <div className="flex w-1/3 text-xs">
                      {quotation && quotation.customer && quotation.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden flex text-xs text-pink-900 font-medium  items-center h-full">
                {quotation && quotation.customer && quotation.customer.name}
                {" - "}
                {quotation &&
                  quotation.customer &&
                  quotation.customer.phoneNumber}
              </div>
            </div>
          </div>
          <div className="flex w-full md:min-h-32 border-2 items-center justify-center p-2">
            <QuotationItemAdd/>
          </div>
          <div className="flex w-full flex-col h-full overflow-y-scroll  border-2 items-center justify-center">
         
          </div>
          <div className="md:hidden flex items-center justify-center  border-2 w-full">
            Extra
          </div>
        </div>
      </div>
      <div className="hidden md:flex h-full items-center justify-center  border-2 w-64">
        Extra
      </div>
    </div>
  );
  // return (
  //   <div
  //     className="flex h-full w-full overflow-scroll no-scrollbar flex-col items-center"
  //     onScroll={onScroll}
  //     ref={listInnerRef}
  //   >
  //     <div className="flex flex-col pt-2 md:flex-row gap-2 items-center justify-center text-pink-900 w-full min-h-28 border-2">
  //       <div className="flex-row flex">
  //         <SiPrintables fontSize={24} />
  //         <p className="quantico-regular  px-3">Page Size</p>
  //       </div>
  //       <div className="relative w-full md:w-auto flex p-2">
  //         <SearchItems fetcher={fetchSearchQuotationItems} />
  //       </div>
  //     </div>
  //     <div className="flex w-full  flex-col">
  //       <div className="flex w-full flex-row text-xs md:text-sm font-medium justify-between text-pink-900  items-center border bg-white shadow-md h-full">
  //         <p className="flex w-1/3  border-r-2  h-full justify-center">
  //           Name
  //         </p>
  //         <p className="w-1/3  md:flex border-r-2  h-full justify-center">
  //           Dimension
  //         </p>
  //         <p className="flex w-1/3  border-r-2  h-full justify-center">
  //           Action
  //         </p>
  //       </div>
  //       {!isLoading ? (
  //         quotationItem.map((quotationItem, index) => (
  //           <QuotationItemCard
  //             key={index}
  //             quotationItem={quotationItem}
  //             handleEdit={handleEdit}
  //             handleDelete={handleDelete}
  //             deletePermission={deletePermission}
  //             updatePermission={updatePermission}
  //           />
  //         ))
  //       ) : (
  //         <>
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //         </>
  //       )}
  //       {isMoreLoading && (
  //         <>
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //           <LoadingQuotationItemCard />
  //         </>
  //       )}
  //       <div className="flex justify-end">
  //         <button onClick={handleAddQuotationItem} className={add_button}>
  //           <p className="text-zinc-50">+</p>
  //         </button>
  //       </div>
  //     </div>

  //     {showModal && (
  //       <QuotationItemAdd
  //         handleModalClose={handleModalClose}
  //         setQuotationItems={setQuotationItems}
  //         setShowModal={setShowModal}
  //       />
  //     )}

  //     {editQuotationItem && (
  //       <QuotationItemEdit
  //         setEditQuotationItem={setEditQuotationItem}
  //         editQuotationItem={editQuotationItem}
  //         handleModalClose={handleModalClose}
  //         setQuotationItems={setQuotationItems}
  //         quotationItem={quotationItem}
  //       />
  //     )}
  //   </div>
  // );
}

export default ListQuotationItems;
