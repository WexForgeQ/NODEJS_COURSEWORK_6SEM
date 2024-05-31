import React, { useCallback, useState } from "react";
import '../../../styles/pages/auth-wrapper-page/login-page/login-page.scss'
import { CustomAuthButton } from "../../../reused/authorization/buttons/CustomAuthButton";
import { CustomInput } from "../../../reused/authorization/index";
import {googleIcon, returnIcon} from "../../../assets/auth-wrapper-page/index";
import { login } from "../../../services/http/fetch-service/index";
import { useDispatch, useSelector } from "react-redux";
import {auth_input, auth_buttons} from "../../../consts/forms/index"
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES, HOME_PAGE_WRAPPER_ROUTES  } from "../../../consts/url-routes";


export const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.fetchData.loading)

    const FormSend = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        for (const pair of formData.entries()) {
          const [key, value] = pair;
          data[key] = value;
        }
        console.log(data);
        dispatch(login(data));
      };

    return (
        <div className="login-page-form-container">
        {isLoading ? <>Loading...</> : <>
        <div className="login-page-form-container-content-container">
        <div onClick={() => navigate(HOME_PAGE_WRAPPER_ROUTES.home.route)} className="login-page-form-container-form-return-button">
        <img src = {returnIcon.svg_icon}></img>
        <p className="login-page-form-container-form-return-button-text">Назад</p>
        </div>
        <form onSubmit={FormSend} className="login-page-form-container-form">
        <div className='login-page-form-container-form-title'>Авторизация</div>
        <div className='login-page-form-container-form-placeholder'>{auth_input.text_email}</div>
        <CustomInput name = "email" type = "email" className = 'login-page-form-container-form-input' placeholder = {auth_input.placeholder_email}></CustomInput>
        <div className='login-page-form-container-form-placeholder'>{auth_input.text_password}</div>
        <CustomInput name = "password"  type = {auth_input.password_type} className = 'login-page-form-container-form-input' placeholder = {auth_input.placeholder_password}></CustomInput>
        <CustomAuthButton type = "submit" text = 'Войти' className = 'login-page-form-container-form-button'/>
        <div onClick={() => navigate(AUTH_ROUTES.registration.route)} className="login-page-form-container-form-registration-route">У меня нет аккаунта</div>
        </form>
        </div>
        </>}
        </div>
    )
}