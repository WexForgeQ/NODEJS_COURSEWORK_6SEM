import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_FETCH_ROUTES } from "../../../consts/fetch-routes/profile-routes";
import { FetchInterceptor } from "./interceptor";
import { caseHandler } from "./case-service";
export const getUserInfo = createAsyncThunk(PROFILE_FETCH_ROUTES.getUserInfo.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'USERID': localStorage.getItem("USERID")
            } 
        }
        const response = await FetchInterceptor.request(PROFILE_FETCH_ROUTES.getUserInfo.url, options);
        const status = await response.status;
        const body = await response.json();
        if(status === 200){
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: PROFILE_FETCH_ROUTES.group, fetch_name: PROFILE_FETCH_ROUTES.getUserInfo.fetch_name}};
    } catch (error){
        
        return thunkAPI.rejectWithValue({error: error.message});
    }
});

export const updateUserInfo = createAsyncThunk(PROFILE_FETCH_ROUTES.updateUserInfo.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'USERID': localStorage.getItem("USERID")
            },
            body: JSON.stringify({
                login: formData.login, phone: formData.phone, fio: formData.fio
            })   
        }
        const response = await FetchInterceptor.request(PROFILE_FETCH_ROUTES.updateUserInfo.url, options);
        const status = await response.status;
        const body = await response.json();
        if(status === 200){
            caseHandler("Профиль обновлён", "success")
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: PROFILE_FETCH_ROUTES.group, fetch_name: PROFILE_FETCH_ROUTES.updateUserInfo.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});

export const createDriver = createAsyncThunk(PROFILE_FETCH_ROUTES.createDriver.async_thunk_route, async(formData, thunkAPI) => {
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(
                formData
            )   
        }
        const response = await FetchInterceptor.request(PROFILE_FETCH_ROUTES.createDriver.url, options);
        const status = await response.status;
        const body = await response.json();
        console.log(body);
        console.log(status);
        if(status === 200){
            console.log(123);
            caseHandler("Водитель и машина добавлены", "success")
        }
        else
        {
            caseHandler(body.message, "error")
        }
        return {data: body, status , fetch_data: {group: PROFILE_FETCH_ROUTES.group, fetch_name: PROFILE_FETCH_ROUTES.createDriver.fetch_name}};
    } catch (error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});