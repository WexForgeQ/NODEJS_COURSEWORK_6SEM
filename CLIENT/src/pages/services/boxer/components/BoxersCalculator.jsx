import React, { useEffect, useState } from "react";
import {CustomInput} from "../../../../reused/authorization/inputs/CustomInput"
import {CustomAuthButton} from "../../../../reused/authorization/buttons/CustomAuthButton"





export const BoxerCalculator = () => {

    const [price, setPrice] = useState("");

    const calculate = (e) =>{
        e.preventDefault();
        if(isNaN(document.getElementById("weight").value) || (isNaN(document.getElementById("time").value)))
        {
            setPrice("Неверный ввод")
        }
        else{
            var selectElement = document.querySelector('.boxer-service-calculator-form-selector');
            var selectedValue = selectElement.value;
            var weight = document.getElementById("weight").value
            var time = document.getElementById("time").value
            switch(selectedValue){
                case "Коммерческий": {
                        if(weight <= 3000){
                            setPrice(weight*time*20)
                        }
                        else if(weight > 3000 && weight<5000)
                        {
                            setPrice(weight*time*40)
                        }
                        else
                        {
                            setPrice(weight*time*100)
                        }
                        break;
                }
                case "Частный": {
                    if(weight <= 3000){
                        setPrice(weight*time*30)
                    }
                    else if(weight > 3000 && weight<5000)
                    {
                        setPrice(weight*time*50)
                    }
                    else
                    {
                        setPrice(weight*time*150)
                    }
                    break;
                }
                case "Офисный": {
                    if(weight <= 3000){
                        setPrice(weight*time*15)
                    }
                    else if(weight > 3000 && weight<5000)
                    {
                        setPrice(weight*time*30)
                    }
                    else
                    {
                        setPrice(weight*time*70)
                    }
                    break;
                }    
            }
        }
    }

    return (
        <div className="boxer-service-calculator">
            <div className="boxer-service-calculator-title">Калькулятор предварительного расчёта цены</div>
            <div className="boxer-service-calculator-inputs">
                {price == "" ? <></> : <div className="boxer-service-calculator-result"><p>Расчетная цена: {price}BYN</p></div>}
                <form onSubmit = {calculate} className="boxer-service-calculator-form">
                    <p className="boxer-service-calculator-form-placeholder">Вес</p>
                    <CustomInput id = "weight" name = "weight" type = "input" className = 'boxer-service-calculator-form-input' placeholder = "Введите примерный вес(кг)"></CustomInput>
                    <p className="boxer-service-calculator-form-placeholder">Время</p>
                    <CustomInput id = "time" name = "weight" type = "input" className = 'boxer-service-calculator-form-input' placeholder = "Введите время на выполнение заказа(ч)"></CustomInput>
                    <p className="boxer-service-calculator-form-placeholder">Тариф</p>
                    <select className="boxer-service-calculator-form-selector">
                        <option>Коммерческий</option>
                        <option>Частный</option>
                        <option>Офисный</option>
                    </select>
                    <CustomAuthButton type = "submit" text = 'Расчитать' className="boxer-service-calculator-form-button"></CustomAuthButton>
                </form>
            </div>
        </div>
    )
}