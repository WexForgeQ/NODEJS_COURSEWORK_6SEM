import React, { useState, useEffect, useCallback} from "react";
import '../../../styles/pages/auth-wrapper-page/registration-page/registration-page.scss'
import { CustomAuthButton } from "../../../reused/authorization/buttons/CustomAuthButton";
import { CustomInput } from "../../../reused/authorization/index";
import {googleIcon} from "../../../assets/auth-wrapper-page/index";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../../consts/url-routes";
import { registration } from "../../../services/http/fetch-service";
import { useDispatch, useSelector } from "react-redux";
import {auth_input, auth_buttons} from "../../../consts/forms/index"

export const RegistrationPage = () => {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const [checkPass, setCheckPass] = useState(true);

    const isLoading = useSelector(state => state.fetchData.loading)

    const PasswordInputChange = () => {
        const passwordValue = document.getElementById("password").value;
        const secondPasswordValue = document.getElementById("secondpassword").value;
        console.log("change");
        if (passwordValue !== secondPasswordValue) {
          setCheckPass(false);
        } else {
          setCheckPass(true);
        }
      };

    const FormSend = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        for (const pair of formData.entries()) {
          const [key, value] = pair;
          data[key] = value;
        }
        console.log(data);
        dispatch(registration(data));
      };


    return (    
        <div className="registration-page-form-container">
          {isLoading ? <>Loading...</> : <>
          <div className="login-page-form-container-content-container">
        <form onSubmit={FormSend} className="registration-page-form-container-form">
        <p className='registration-page-form-container-form-title'>Создать учетную запись</p>
        <p className='registration-page-form-container-form-placeholder'>{auth_input.text_login}</p>
        <CustomInput  name = "username" regex = {{pattern: auth_input.login_regex, title: auth_input.text_lg_regex}} type = {auth_input.text_type} className = 'registration-page-form-container-form-input' placeholder = {auth_input.placeholder_login}></CustomInput>
        <p className='registration-page-form-container-form-placeholder'>{auth_input.text_email}</p>
        <CustomInput  name = "email" type = "email" className = 'registration-page-form-container-form-input' placeholder = {auth_input.placeholder_email}></CustomInput>
        <p className='registration-page-form-container-form-placeholder'>{auth_input.text_password}</p>
        <CustomInput id = "password" regex = {{pattern: auth_input.password_regex, title: auth_input.text_pw_regex}} name = "password" onChange = {PasswordInputChange} type = {auth_input.password_type} className = 'registration-page-form-container-form-input' placeholder = {auth_input.placeholder_password}></CustomInput>
        <p className='registration-page-form-container-form-placeholder'>{auth_input.text_secondpass}</p>
        <CustomInput id = "secondpassword" regex = {{pattern: auth_input.password_regex, title: auth_input.text_pw_regex}} name = "secondpassword" onChange = {PasswordInputChange} type = {auth_input.password_type} className = 'registration-page-form-container-form-input' placeholder = {auth_input.placeholder_secondpass}></CustomInput>
        {checkPass ? (
  <>
    <CustomAuthButton
      type="submit"
      text={auth_buttons.text_registration}
      className="registration-page-form-container-form-button"
    />
  </>
) : (
  <>
    <CustomAuthButton
      isDisabled = 'true'
      type="submit"
      text='Пароли не совпадают'
      className="registration-page-form-container-form-wrong-password-button"
    />
  </>
)}
        <p className="registration-page-form-container-form-policy">Продолжая, вы соглашаетесь с Условиями использования и Политикой конфиденциальности </p>
        <p onClick={() => navigate(AUTH_ROUTES.login.route)} className="registration-page-form-container-form-registration-route">У меня есть аккаунт</p>
        </form>
        </div>
        </>}
        </div>
    )
}