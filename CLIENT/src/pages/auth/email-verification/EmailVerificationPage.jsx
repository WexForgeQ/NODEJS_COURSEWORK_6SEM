import React, { useState, useEffect} from "react";
import '../../../styles/pages/auth-wrapper-page/email-verification-page/email-verification-page.scss'
import { CustomAuthButton } from "../../../reused/authorization/buttons/CustomAuthButton";
import { CustomInput } from "../../../reused/authorization/index";
import { useDispatch } from "react-redux";
import { emailverification } from "../../../services/http/fetch-service";
import {auth_input, auth_buttons} from "../../../consts/forms/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {returnIcon} from "../../../assets/auth-wrapper-page/index"

export const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.authData.user_id)

    const FormSend = (e) => {
        e.preventDefault();
        console.log(user_id);
        const formData = new FormData(e.target);
        const data = {user_id};
        for (const pair of formData.entries()) {
          const [key, value] = pair;
          data[key] = value;
        }
        dispatch(emailverification(data));
      };

    const isLoading = useSelector(state => state.fetchData.loading)

    return (
        <div className="email-verification-page-form-container">
        {isLoading ? <>Loading...</> : <>
        <div className="email-verification-page-form-container-content-container">
        <div onClick={() => navigate(-1)} className="email-verification-page-form-container-form-return-button">
        <img src = {returnIcon.svg_icon}></img>
        <p className="email-verification-page-form-container-form-return-button-text">Назад</p>
        </div>
        <form onSubmit={FormSend} className="email-verification-page-form-container-form">
        <p className='email-verification-page-form-container-form-title'>Подтверждение почты</p>
        <p className='email-verification-page-form-container-form-placeholder'>код</p>
        <CustomInput name = "activate_value" type = {auth_input.text_type} className = 'email-verification-page-form-container-form-input' placeholder = {auth_input.placeholder_code}></CustomInput>
        <CustomAuthButton type = "submit" text = {auth_buttons.text_registration} className = 'email-verification-page-form-container-form-button'/>
        </form>
        </div>
        </>}
        </div>
    )
}