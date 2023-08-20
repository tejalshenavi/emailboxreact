import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const RootLayout = (props) => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    )
}

export default RootLayout;

