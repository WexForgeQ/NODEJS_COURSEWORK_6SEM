import {React, memo } from "react";

export const CustomButton = memo(({type = 'button', icon = {svg_icon:"", alt_prop: "", }, 
text = 'Btn', isDisabled = false, clickCallback, className, divClassName}) =>{
    return(
        <div className={divClassName}>
            {isDisabled ? <><button disabled onClick={clickCallback} className= {className}>
                {icon.svg_icon  ? 
                <><img src={icon.svg_icon}/>
                <p>{text}</p></>
                : <span>{text}</span>}
           </button></> :
           <><div><button onClick={clickCallback} className= {className}>
           {icon.svg_icon  ? 
                <><div style={{display: "flex"}}><p>{text}</p><img src={icon.svg_icon}/></div></>
           : <span>{text}</span>}
            </button></div></>}
        </div>
    );
}) 