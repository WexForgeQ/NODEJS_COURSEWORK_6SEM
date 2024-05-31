import React, { useEffect, useState } from "react";
import { edit_icon } from "../../../../assets/icons/services/chagall";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../../../services/http/fetch-service/profile-service";
import { CustomAuthButton, CustomInput } from "../../../../reused/authorization";

export const BoxerProfile = () => {

    
const dispatch = useDispatch()


const [loader, SetLoader] = useState(false);
const isLoading = useSelector(state => state.fetchData.loading)
const userprofile = useSelector(state => state.profileData.userinfo)
const [edit, setEdit] = useState(false);
const [date, setDate] = useState("");
const [fmdate, setFmDate] = useState("");
const [info, setInfo] = useState({login: " ", email: " ", userprofile: {fio:"123", phone:" ", registration_date: " "}})

const [login, setLogin] = useState("")
const [fio, setFIO] = useState("")
const [phone, setPhone] = useState("")

useEffect(() => {
            dispatch(getUserInfo(123));
    }, []);

    useEffect(() => {
        if (Object.keys(userprofile).length !== 0) {
            setInfo(userprofile);
            console.log(info)
            setLogin(userprofile.login);
            setFIO(userprofile.userprofile.fio);
            setPhone(userprofile.userprofile.phone);
            setDate(info.userprofile.registration_date)
            let newDT = new Date(date)
            setFmDate(newDT.toLocaleDateString());
        }
    }, [userprofile]);
    
const EditHandler = (e) =>{
    e.preventDefault();
    const data = {login, phone, fio};
    dispatch(updateUserInfo(data));
}


return (
        <>{isLoading ? <>LOADING....</> : <div className="boxer-service-profile">
        <div className="boxer-service-profile-title">
            <p>Профиль</p>
            <img onClick={() => setEdit(!edit)} src = {edit_icon.svg_icon} alt={edit_icon.alt_prop} ></img>
        </div>
        <div style={{display: "flex"}}>
           
            <div className="boxer-service-profile-info">  
                <div className="boxer-service-profile-info-field"><p>Логин:</p><p>{info.login}</p></div>
                <div className="boxer-service-profile-info-field"><p>E-mail:</p><p>{info.email}</p></div>
                <div className="boxer-service-profile-info-field"><p>ФИО:</p><p>{info.userprofile.fio}</p></div>
                <div className="boxer-service-profile-info-field"><p>Телефон:</p><p>{info.userprofile.phone}</p></div>
                <div className="boxer-service-profile-info-field"><p>Дата регистрации:</p><p>{fmdate}</p></div>
            </div>
            {edit ?
                <div className="boxer-service-profile-edit">
                    <form onSubmit={EditHandler}>
                    <div><p style = {{fontSize:"20px"}} className="boxer-service-profile-title">Изменение профиля</p></div>
                    <div><p className="boxer-service-profile-edit-placeholder">Логин</p><CustomInput onChange = {(e) => setLogin(e.target.value)} value = {login} className="boxer-service-profile-edit-input" placeholder = {info.login}></CustomInput></div>
                    <div><p className="boxer-service-profile-edit-placeholder">ФИО</p><CustomInput onChange = {(e) => setFIO(e.target.value)} value = {fio} className="boxer-service-profile-edit-input" placeholder = {info.userprofile.fio}></CustomInput></div>
                    <div><p className="boxer-service-profile-edit-placeholder">Телефон</p><CustomInput onChange = {(e) => setPhone(e.target.value)} value = {phone} className="boxer-service-profile-edit-input" placeholder = {info.userprofile.phone}></CustomInput></div>
                    <div><CustomAuthButton type = "submit" text = "Редактировать" className="boxer-service-profile-edit-button"></CustomAuthButton></div>
                    </form>
                </div>
             :
             <></>}

        </div>
    </div>}</>
        
    )
}