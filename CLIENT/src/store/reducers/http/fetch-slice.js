import { createSlice } from "@reduxjs/toolkit";
import { emailverification, login, registration, passwordrecovery, emailpwrecovery, logout, role } from "../../../services/http/fetch-service";
import { getUserInfo, updateUserInfo } from "../../../services/http/fetch-service/profile-service";
import { addOrder, getCars, getOrders, getSingleOrder } from "../../../services/http/fetch-service/orders-service";

export const fetchSlice = createSlice({
    name: "responseData",
    initialState: {
        fetch_data: {},
        loading: false,
        status: null,
        error: null,
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //auth - fetch group name
            //Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if (action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                } else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
            .addCase(role.pending, (state) => {
                state.loading = true;
            })
            .addCase(role.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if (action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                } else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(role.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
            //Registration cases
            .addCase(registration.pending, (state)=>{
                state.loading = true;
            })
            .addCase(registration.fulfilled, (state, action) =>{
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
            //EmailVerification cases
            .addCase(emailverification.pending, (state)=>{
                state.loading = true;
            })
            .addCase(emailverification.fulfilled, (state, action) =>{
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(emailverification.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
            //PasswordRecovery case


            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })

            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })

            .addCase(getOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })

            
            .addCase(getSingleOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })

            .addCase(getCars.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCars.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(getCars.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })

            .addCase(addOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.fetch_data = action.payload.fetch_data;
                state.status = action.payload.status;
                if(action.payload.status === 200) {
                    state.error = null;
                    state.data = action.payload.data;
                }
                else {
                    state.data = null;
                    state.error = action.payload.data;
                }
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.fetch_data = {};
                state.error = action.payload.error;
            })
    }
})