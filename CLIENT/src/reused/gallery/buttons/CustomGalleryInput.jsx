import {React, memo, useState, useEffect } from "react";

export const CustomGalleryInput = memo(({id, name = "name", type = 'text',style, icon = {svg_icon:"", alt_prop: "", }, 
placeholder = 'Placeholder', className, onChange, clickIcon, regex ={pattern:"^.+$", title: "Строка не должна быть пустой"}}) =>{
    return(
        <div className = {className} style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <><input onChange={(e) => {onChange(e.target.value)}} pattern= {regex.pattern} title = {regex.title} id = {id} name = {name} required = {true}  type="search" placeholder={placeholder} className={className}>
            </input>
            {{icon} != "" ? <><img src={icon.svg_icon} onClick = {clickIcon}></img></> : <></>}</>
        </div>

    )
})