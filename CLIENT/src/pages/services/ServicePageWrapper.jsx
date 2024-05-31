import React, { useEffect } from "react"
import {Outlet} from "react-router-dom";
import { startListening } from "../../services/ws/ws-service";
import { useDispatch } from "react-redux";

export const ServicePageWrapper = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <Outlet/>
        </div>
    )
}