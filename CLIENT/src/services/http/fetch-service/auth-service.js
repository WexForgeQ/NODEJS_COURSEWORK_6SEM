import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_FETCH_ROUTES } from "../../../consts/fetch-routes";
import {FetchInterceptor} from "./interceptor"
import { enqueueSnackbar } from "notistack";
import { caseHandler } from "./case-service";
let errorH = "";

export const login = createAsyncThunk(AUTH_FETCH_ROUTES.login.async_thunk_route, async (formData, thunkAPI) => {
    
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      }
      const response = await fetch(AUTH_FETCH_ROUTES.login.url, options)
      console.log(response);
      const status = await response.status;
      const body = await response.json();
      errorH = body.message
      localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, body.tokenData.access_token);
      localStorage.setItem("USERID", body.userid)
      caseHandler("Успешный вход", "success")
      return { data: body, status, fetch_data: { group: AUTH_FETCH_ROUTES.group, fetch_name: AUTH_FETCH_ROUTES.login.fetch_name } };
    } catch (error) {
        caseHandler(errorH, "error")
        return thunkAPI.rejectWithValue({ error: error.message });
    }
  });

export const registration = createAsyncThunk(AUTH_FETCH_ROUTES.registration.async_thunk_route, async (formData, thunkAPI) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username, email: formData.email, password: formData.password
            })
        }
        const response = await fetch(AUTH_FETCH_ROUTES.registration.url, options);
        const status = response.status;
        const body = await response.json();
        errorH = body.message
        if(status == 200){
            caseHandler("Успешная регистрация, подтвердите e-mail", "success")
        }
        else
        {
            caseHandler(errorH, "error")
        }
        return { data: body, status, fetch_data: { group: AUTH_FETCH_ROUTES.group, fetch_name: AUTH_FETCH_ROUTES.registration.fetch_name } };
    } catch (error) {
        caseHandler(errorH, "error")
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const emailverification = createAsyncThunk(AUTH_FETCH_ROUTES.emailcode.async_thunk_route, async (formData,thunkAPI) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: formData.user_id, code: formData.activate_value
            })
        }
        const response = await fetch(AUTH_FETCH_ROUTES.emailcode.url, options);
        const status = response.status;
        const body = await response.json();
        errorH = body.message
        localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, body.tokens.access_token);
        localStorage.setItem("USERID", body.userid)
        caseHandler("E-mail подтверждён", "success")
        return { data: body, status, fetch_data: { group: AUTH_FETCH_ROUTES.group, fetch_name: AUTH_FETCH_ROUTES.emailcode.fetch_name } };
    } catch (error) {
        caseHandler(errorH, "error")
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const logout = createAsyncThunk(AUTH_FETCH_ROUTES.logout.async_thunk_route, async (formData, thunkAPI) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)}`
            },
            body: JSON.stringify({
                access: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)
            })
        }
        const response = await fetch(AUTH_FETCH_ROUTES.logout.url, options);
        const status = await response.status;
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
        localStorage.removeItem("USERID");  
        caseHandler("Успешный выход", "success")
        return {data: 123, status, fetch_data: { group: AUTH_FETCH_ROUTES.group, fetch_name: AUTH_FETCH_ROUTES.logout.fetch_name } };
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const role = createAsyncThunk(AUTH_FETCH_ROUTES.role.async_thunk_route, async (formData, thunkAPI) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)
            })
        }
        const response = await FetchInterceptor.request(AUTH_FETCH_ROUTES.role.url, options);
        const status = await response.status;
        const body = await response.json();
        return {data: body, status, fetch_data: { group: AUTH_FETCH_ROUTES.group, fetch_name: AUTH_FETCH_ROUTES.role.fetch_name } };
    } catch (error) {
        //caseHandler("Ошибка", "error");
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});