import React from "react";
import { BiMessageDetail,BiHomeSmile } from "react-icons/bi";
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
import { ImProfile } from "react-icons/im";
import Profile from "../pages/Profile";
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
        element:<h3>Classes</h3>

    },
    
]

export const DASHBOARD_SIDEBAR_SEC =[
    {
        key:1,
        title:"Users",
        to:"users",
        icon:<FaUserCog color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<UserLayout  pageName={'listUser'} contentComponent={<ListUser/>}/>

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
        element:<UserLayout  pageName={'roles'} contentComponent={<ListRoles/>}/>

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

    },
    {
        key:3,
        title:"Log out",
        to:"logout",
        icon:<IoLogOutOutline  color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<LogOut/>

    },
    {
        key:3,
        title:"Profile",
        to:"profile",
        icon:<ImProfile  color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<Profile />

    },
    {
        key:3,
        title:"Form",
        to:"forms",
        icon:<IoLogOutOutline  color="rgb(80 7 36)"/>,
        sidebar:true,
        element:<SearchSelect/>

    },
    {
        key:4,
        title:"test",
        to:"test",
        icon:<BiSupport color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<h3>Development in Progress</h3>

    },
    {
        key:4,
        title:"test",
        to:"test1",
        icon:<BiSupport color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<h3>Development in Progress</h3>

    },
    {
        key:4,
        title:"test",
        to:"test2",
        icon:<BiSupport color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<h3>Development in Progress</h3>

    }
    ,
    {
        key:4,
        title:"permissions",
        to:"permissions",
        icon:<BiSupport color="rgb(80 7 36)"/>,
        sidebar:false,
        element:<ListPermissions/>

    }
]