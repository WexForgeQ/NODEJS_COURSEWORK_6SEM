import { useState, memo } from "react";
import { gallery_filters } from "../../consts/forms";
import '../../styles/pages/home/home-pages/gallery/reused/gallery-filter.scss'
import { OutlineIcon } from "../../assets/icons";
export const StandartFilter = memo(({id, name, filters, activeFilter, clickCallback})=>{

return(
    <div className="standart-gallery-filter">
        {Object.values(filters).map((item, index) =>{
            return <div onClick = {() => clickCallback(item)} className = "standart-gallery-filter-container" key={item.id}>
            {activeFilter === item ?
                <><img src={OutlineIcon.svg_icon}></img><p className="standart-gallery-filter-text-active">{item.text}</p></> :
                <><div className="standart-gallery-filter-container-placeholder"></div><p className="standart-gallery-filter-text-not-active">{item.text}</p></>}
            </div>
        })}
    </div>
)



})