import React from "react";
import {Outlet} from "react-router-dom";

export const BlogPage = () => {
    return (
        <div>
            Blog
            <Outlet/>
        </div>
    )
}