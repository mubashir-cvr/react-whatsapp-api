import React from "react";
import { BiMessageDetail,BiHomeSmile } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { RiRadioLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { BiSupport } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import ListUser from "../pages/ListUser";
import AddUser from "../pages/AddUser";
import UserLayout from "../layouts/UserLayout";
export const DASHBOARD_SIDEBAR =[
    {
        key:1,
        title:"Home",
        to:"",
        icon:<BiHomeSmile color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Home Page</h3>
    },
    {
        key:2,
        title:"Messeges",
        to:"messagges",
        icon:<BiMessageDetail color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Messages</h3>
    },
    {
        key:3,
        title:"Find Expert",
        to:"find",
        icon:<RiUserSearchLine color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Find</h3>

    },
    {
        key:4,
        title:"Needs",
        to:"needs",
        icon:<CgNotes color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Needs</h3>

    },
    {
        key:5,
        title:"Classes",
        to:"classes",
        icon:<RiRadioLine color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Find</h3>

    },
    
]

export const DASHBOARD_SIDEBAR_SEC =[
    {
        key:1,
        title:"Users",
        to:"users",
        icon:<FaUserCog color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<UserLayout  pageName={'listUser'} contentComponent={<div>List User</div>}/>

    },
    {
        key:1,
        title:"Add User",
        to:"adduser",
        icon:<FaUserCog color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<UserLayout  pageName={'addUser'} contentComponent={<div>Add User</div>}/>

    },
    {
        key:1,
        title:"Add User",
        to:"roles",
        icon:<FaUserCog color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<UserLayout  pageName={'roles'} contentComponent={<div>Roles</div>}/>

    },
    {
        key:2,
        title:"My Calandar",
        to:"calandar",
        icon:<RxCalendar color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Calandar</h3>

    },
    {
        key:3,
        title:"Support",
        to:"support",
        icon:<BiSupport color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<h3>Support</h3>

    }
]