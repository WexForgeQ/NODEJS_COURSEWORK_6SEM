import {React, memo, useState, useEffect } from "react";
import { hidePasswordIcon } from "../../../assets/auth-wrapper-page";

export const CustomInput = memo(({id, value = "", name = "name", type = 'text',style, icon = {svg_icon:"", alt_prop: "", }, 
placeholder = 'Placeholder', className, onChange, clickIcon, regex ={pattern:"^.+$", title: "Строка не должна быть пустой"}}) =>{

    const hidePassword = ()=>{
        hidepw == 'text' ? setHidePw('password') : setHidePw('text')
    }

    const [hidepw, setHidePw] = useState(type);
    return(
        <div className = {className} style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <>
            <input onChange={onChange} pattern= {regex.pattern} title = {regex.title} id = {id} name = {name} required = {true}  type={hidepw} placeholder={placeholder} className={className}>
            </input>
            {type == 'password' ? <><img style = {{cursor: 'pointer', height:'27px',weight: '20px', paddingRight:'21px'}} onClick={hidePassword} src={hidePasswordIcon.svg_icon}></img></> : <></>}
            {{icon} != "" ? <><img src={icon.svg_icon} onClick = {clickIcon}></img></> : <></>}</>
        </div>

    )
})