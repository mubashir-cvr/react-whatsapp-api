import React from "react";
import { BiMessageDetail, BiHomeSmile } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { RiRadioLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import ListUser from "../pages/ListUser";
import UserLayout from "../layouts/UserLayout";
import LogOut from "../Auth/LogOut";
import ListPermissions from "../pages/ListPermissions";
import SearchSelect from "../form/SearchSelect";
import ListRoles from "../pages/ListRoles";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import { FaListCheck } from "react-icons/fa6";
import { GrDocumentUser } from "react-icons/gr";
import ListStocks from "../pages/ListStocks";
import StockLayout from "../layouts/StockLayout";
import ListStockItems from "../pages/ListStockItems";
import ListStockTransactions from "../pages/ListStockTransactions";
import ListQuotationItems from "../pages/ListQuotationItems";
import ListPageSizes from "../pages/ListPageSizes";
import { GiResize } from "react-icons/gi";
import ListPrinters from "../pages/ListPrinters";
import { BiPrinter } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ListCustomers from "../pages/ListCustomers";
import ListQuotations from "../pages/ListQuotations";
import PageLayout from "../components/quotationItem/PageLayout";
export const DASHBOARD_SIDEBAR = [
  {
    title: "Home",
    to: "",
    icon: <BiHomeSmile color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <h3>Home Page</h3>,
  },
  {
    title: "Messeges",
    to: "messagges",
    icon: <BiMessageDetail color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <h3>Messages</h3>,
  },
  {
    title: "Quotation",
    to: "quotations",
    icon: <LiaFileInvoiceSolid color="rgb(80 7 36)" />,
    sidebar: true,
    object:'Quotation',
    element:<ListQuotations/>,
  },
  {
    title: "Quotation",
    to: "quotation/:quotationID",
    icon: <LiaFileInvoiceSolid color="rgb(80 7 36)" />,
    sidebar: false,
    object:'Quotation',
    element:<ListQuotationItems/>,
  },
  {
    title: "Customer",
    to: "customer",
    icon: <FaUser color="rgb(80 7 36)" />,
    sidebar: true,
    object:'Customer',
    element: <ListCustomers/>,
  },
  {
    title: "Classes",
    to: "classes",
    icon: <RiRadioLine color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <PageLayout/>
  },
];

export const DASHBOARD_SIDEBAR_SEC = [
  {
    title: "Staffs",
    to: "users",
    icon: <FaUserCog color="rgb(80 7 36)" />,
    sidebar: true,
    object:'User',
    element: (
      <UserLayout pageName={"listUser"} contentComponent={<ListUser />} />
    ),
  },
  {
    title: "Add User",
    to: "roles",
    icon: <FaUserCog color="rgb(80 7 36)" />,
    sidebar: false,
    object:'Role',
    element: <UserLayout pageName={"roles"} contentComponent={<ListRoles />} />,
  },
  {
    title: "Stocks",
    to: "stocks",
    icon: <FaListCheck color="rgb(80 7 36)" />,
    sidebar: true,
    object:'Stock',
    element: <StockLayout pageName={"stock"} contentComponent={<ListStocks/>}/>,
  },
  {
    title: "Stocks Items",
    to: "stocksitems",
    icon: <FaListCheck color="rgb(80 7 36)" />,
    sidebar: false,
    object:'StockItem',
    element: <StockLayout pageName={"stockItems"} contentComponent={<ListStockItems/>}/>,
  },
 
  
  {
    title: "Form",
    to: "forms",
    icon: <IoLogOutOutline color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <SearchSelect />,
  },
  {
    title: "test",
    to: "test",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <h3>Development in Progress</h3>,
  },
  {
    title: "test",
    to: "test1",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <h3>Development in Progress</h3>,
  },
  {
    title: "test",
    to: "test2",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <h3>Development in Progress</h3>,
  },
  {
    title: "reset-password",
    to: "reset-password",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <ResetPassword/>,
  },
  {
    title: "permissions",
    to: "permissions",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <ListPermissions />,
  },
  {
    title: "stockhistory",
    to: "stockhistory/:itemID",
    icon: <BiSupport color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <ListStockTransactions />,
  },
  {
    title: "Size Chart",
    to: "sizechart",
    icon: <GiResize color="rgb(80 7 36)" />,
    sidebar: true,
    object:'PageSize',
    element: <ListPageSizes />,
  },
  {
    title: "Printers",
    to: "printers",
    icon: <BiPrinter color="rgb(80 7 36)" />,
    sidebar: true,
    object:'Printer',
    element:<ListPrinters/>
  },
  {
    title: "Profile",
    to: "profile",
    icon: <GrDocumentUser color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <Profile />,
  },
  {
    title: "Log out",
    to: "logout",
    icon: <IoLogOutOutline color="rgb(80 7 36)" />,
    sidebar: false,
    object:'',
    element: <LogOut />,
  },
];
