import { createAsyncThunk } from "@reduxjs/toolkit";
import { GALLERY_FETCH_ROUTES, ORDER_FETCH_ROUTES } from "../../../consts/fetch-routes";
import { json } from "react-router-dom";
import { FetchInterceptor } from "./interceptor";
import { caseHandler } from "./case-service";

export const getOrders = createAsyncThunk(ORDER_FETCH_ROUTES.getOrders.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'USERID': localStorage.getItem("USERID")
            },
            credentials : 'include',
            body: JSON.stringify({
                page: formData.page_number, activeFilter: formData.activeFilter
            })    
        }
        const response = await FetchInterceptor.request(ORDER_FETCH_ROUTES.getOrders.url, options);
        const status = await response.status;
        const body = await response.json();
        if(status === 200){
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: ORDER_FETCH_ROUTES.group, fetch_name: ORDER_FETCH_ROUTES.getOrders.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});

export const getSingleOrder= createAsyncThunk(ORDER_FETCH_ROUTES.getSingleOrder.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'ID' : `${formData.id}`
            },
            credentials : 'include',    
        }
        const response = await FetchInterceptor.request(ORDER_FETCH_ROUTES.getSingleOrder.url, options);
        const status = response.status;
        const body = await response.json();
        if(status === 200){
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: ORDER_FETCH_ROUTES.group, fetch_name: ORDER_FETCH_ROUTES.getSingleOrder.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
})

export const changeOrderStatus = createAsyncThunk(ORDER_FETCH_ROUTES.getSingleOrder.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'ID' : `${formData.id}`
            },
            body: JSON.stringify({
                status: formData.status
            }),   
            credentials : 'include',    
        }
        const response = await FetchInterceptor.request(ORDER_FETCH_ROUTES.changeOrderStatus.url, options);
        const status = response.status;
        const body = await response.json();
        if(status === 200){
            caseHandler("Успешно", "success")
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: ORDER_FETCH_ROUTES.group, fetch_name: ORDER_FETCH_ROUTES.changeOrderStatus.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
})

export const getCars = createAsyncThunk(ORDER_FETCH_ROUTES.getCars.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                date: formData.formattedDate
            }),   
            credentials : 'include',    
        }
        const response = await FetchInterceptor.request(ORDER_FETCH_ROUTES.getCars.url, options);
        const status = response.status;
        const body = await response.json();
        return {data: body, status , fetch_data: {group: ORDER_FETCH_ROUTES.group, fetch_name: ORDER_FETCH_ROUTES.getCars.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
})

export const addOrder = createAsyncThunk(ORDER_FETCH_ROUTES.addOrder.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'USERID': localStorage.getItem("USERID")
            },
            body: JSON.stringify({
                destination_point: formData.destination_point, departure_point: formData.departure_point, car_id: formData.car_id, price: formData.price, order_date: formData.formattedDate, cargo: formData.cargo
            }),   
            credentials : 'include',    
        }
        const response = await FetchInterceptor.request(ORDER_FETCH_ROUTES.addOrder.url, options);
        const status = response.status;
        const body = await response.json();
        if(status === 200){
            caseHandler("Заказ оформлен", "success")
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: ORDER_FETCH_ROUTES.group, fetch_name: ORDER_FETCH_ROUTES.addOrder.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
})