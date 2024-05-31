import React from "react";
import {Outlet} from "react-router-dom";

export const ProfilePageWrapper = () => {
    return (
        <div>
            Account wrapper
            <Outlet/>
        </div>
    )
}