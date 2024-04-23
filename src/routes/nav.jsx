import React from "react";
import { BiMessageDetail, BiHomeSmile } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { RiRadioLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
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
    to: "quotation",
    icon: <LiaFileInvoiceSolid color="rgb(80 7 36)" />,
    sidebar: true,
    object:'Quotation',
    element: <h3>Qutation</h3>,
  },
  {
    title: "Needs",
    to: "needs",
    icon: <CgNotes color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <h3>Needs</h3>,
  },
  {
    title: "Classes",
    to: "classes",
    icon: <RiRadioLine color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <h3>Classes</h3>,
  },
];

export const DASHBOARD_SIDEBAR_SEC = [
  {
    title: "Users",
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
    element: <ListStocks/>,
  },
  {
    title: "Log out",
    to: "logout",
    icon: <IoLogOutOutline color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <LogOut />,
  },
  {
    title: "Profile",
    to: "profile",
    icon: <GrDocumentUser color="rgb(80 7 36)" />,
    sidebar: true,
    object:'',
    element: <Profile />,
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
];
