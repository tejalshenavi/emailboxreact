import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Profile/SideBar";

import classes from './Root.module.css';

const Root2Layout = (props) => {
    return (
        <section >
            {/* <h1 className={classes.headone}>Welcome to Metro mail</h1> */}
            <div className={classes.root}>
            <SideBar />
            <Outlet />
            </div>
           
        </section>
    )
}

export default Root2Layout;