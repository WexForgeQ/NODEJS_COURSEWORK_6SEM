import {React, memo } from "react";

export const CustomAuthButton = memo(({type = 'button', icon = {svg_icon:"", alt_prop: "", }, 
text = 'Btn', isDisabled = false, clickCallback, className, divClassName}) =>{
    return(
        <div className={divClassName}>
            {isDisabled ? <><button disabled onClick={clickCallback} className= {className}>
                {icon.svg_icon  ? 
                <><img src={icon.svg_icon}/>
                <p>{text}</p></>
                : <span>{text}</span>}
           </button></> :
           <><button onClick={clickCallback} className= {className}>
           {icon.svg_icon  ? 
           <><img src={icon.svg_icon}/>
           <p>{text}</p></>
           : <span>{text}</span>}
            </button></>}
        </div>
    );
})