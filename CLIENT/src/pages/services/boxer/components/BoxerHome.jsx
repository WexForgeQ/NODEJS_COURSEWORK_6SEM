import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomAuthButton, CustomInput } from "../../../../reused/authorization";
import { returnIcon } from "../../../../assets/auth-wrapper-page";
import { addOrder, getCars } from "../../../../services/http/fetch-service/orders-service";
import { StandartFilter } from "../../../../reused/filters/Standartfilter";
import { car_filters } from "../../../../consts/forms";
import { link_icon } from "../../../../assets/icons/home-page";
import { createDriver } from "../../../../services/http/fetch-service/profile-service";

export const BoxerHome = () => {
    const [cargo, setCargo] = useState([{name: "123", weight: "100", quantity: "2"},{name: "123", weight: "100", quantity: "2"}, {name: "123", weight: "100", quantity: "2"}]);
    const [totalWeight, setTotalWeight] = useState(0) 
    const dispatch = useDispatch();
    const [date, setDate] = useState(null)
    const [carsList, setCarsList] = useState([])
    const [activeFilter, setActiveFilter] = useState(car_filters[0])
    const carsArray = useSelector(state => state.orderData.carsArray)
    const [showFilter, setShowFilter] = useState()
    const [price, setPrice] = useState("");
    const [selectedCar, setSelectedCar] = useState({})
    const [route, setRoute] = useState({destination: " ", departure: " "})
    const user_role = useSelector(state => state.authData.user_role)
    const SelectorHandler = (item) =>{
        setShowFilter(!showFilter)
        setActiveFilter(item)
    }
    const addOrderHandle = (e) =>{
        e.preventDefault();
        const dt = new Date(date);
        const formattedDate = dt.toISOString();
        const data = {price, cargo, car_id: selectedCar.number, departure_point: route.departure, destination_point: route.destination, formattedDate}
        dispatch(addOrder(data));
    }

    const calculate = (e) =>{
        e.preventDefault();
        if(isNaN(totalWeight) || (isNaN(document.getElementById("time").value)))
        {
            setPrice("Неверный ввод")
        }
        else{
            setRoute({destination: document.getElementById("in").value, departure: document.getElementById("from").value})
            var selectElement = document.querySelector('.boxer-service-calculator-form-selector');
            var selectedValue = selectElement.value;
            var time = document.getElementById("time").value
            switch(selectedValue){
                case "Коммерческий": {
                        if(totalWeight <= 3000){
                            setPrice(totalWeight*time*20)
                        }
                        else if(totalWeight> 3000 && totalWeight<5000)
                        {
                            setPrice(totalWeight*time*40)
                        }
                        else
                        {
                            setPrice(totalWeight*time*100)
                        }
                        break;
                }
                case "Частный": {
                    if(totalWeight <= 3000){
                        setPrice(totalWeight*time*30)
                    }
                    else if(totalWeight> 3000 && totalWeight<5000)
                    {
                        setPrice(totalWeight*time*50)
                    }
                    else
                    {
                        setPrice(totalWeight*time*150)
                    }
                    break;
                }
                case "Офисный": {
                    if(totalWeight <= 3000){
                        setPrice(totalWeight*time*15)
                    }
                    else if(totalWeight > 3000 && totalWeight<5000)
                    {
                        setPrice(totalWeight*time*30)
                    }
                    else
                    {
                        setPrice(totalWeight*time*70)
                    }
                    break;
                }    
            }
        }
    }

    const FormSend = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        console.log(formData.keys);
        const data = {};
        for (const pair of formData.entries()) {
          const [key, value] = pair;
          data[key] = value;
        }
        console.log(data);
        dispatch(createDriver(data))
      };


    useEffect(() => {
        var weight = 0
        cargo.forEach((item) => {
            weight += item.weight * item.quantity;
          });
        setTotalWeight(weight);
      }, [cargo]);

    const addHandler = (e) =>{
        e.preventDefault()
        setCargo([...cargo, {name: document.getElementById("name").value , weight: document.getElementById("weight").value, quantity: document.getElementById("count").value}])
    }
    useEffect(() => {
        if(date!=null){
            const dt = new Date(date);
            const formattedDate = dt.toISOString();
            console.log(formattedDate);
            dispatch(getCars({formattedDate}))
        }
      }, [date]);

      useEffect(() => {
        if (activeFilter.id === 0) {
            setCarsList(carsArray.filter(car => car.capacity >= totalWeight));
            setSelectedCar({})
        }
        else{
            setCarsList(carsArray);
            setCarsList(prevCarsList => prevCarsList.filter(car => car.type === activeFilter.text && car.capacity >= totalWeight));
            setSelectedCar({})
        }
      }, [activeFilter, totalWeight]);

    useEffect(()=>{
        setCarsList(carsArray.filter(car => car.capacity >= totalWeight));
    }, [carsArray])

    const deleteHandler = (index, e) => {
        e.preventDefault();
        const updatedCargo = cargo.filter((item, i) => i !== index);
        setCargo(updatedCargo);
      };
    return (
        <div className="boxer-service-content-order">
            {user_role == 0
                ?
                    <><div className="boxer-service-content-order-title"><p>Управление БД</p></div>
                    <div  className="boxer-service-content-order-form-holders" style = {{flexDirection: "row", weight: "500px"}}>
                        <form onSubmit={FormSend} style = {{flexDirection: "row", weight: "500px"}} className="boxer-service-content-order-form-holders-first">
                            <div>
                            <p>Добавить Водителя</p>
                            <p className="boxer-service-content-order-form-holders-first-placeholder">Логин</p>
                            <CustomInput name = "login" id = "login"  placeholder = "логин" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            <p className="boxer-service-content-order-form-holders-first-placeholder">E-mail</p>
                            <CustomInput name = "email" id = "email" placeholder = "e-mail" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            <p className="boxer-service-content-order-form-holders-first-placeholder">Пароль:</p>
                            <CustomInput name = "password" id = "pass" placeholder = "password" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            </div>
                            <div>
                            <p>Добавить Машину</p>
                            <p className="boxer-service-content-order-form-holders-first-placeholder">Номер:</p>
                            <CustomInput name = "car_number" id = "name" placeholder = "номер" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            <p  className="boxer-service-content-order-form-holders-first-placeholder">Тип</p>
                            <CustomInput name = "type" id = "type"  placeholder = "тип" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            <p className="boxer-service-content-order-form-holders-first-placeholder">Грузоподъемность</p>
                            <CustomInput name = "weight" id = "weight" placeholder = "грузоподъемность" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                            </div>
                            <CustomAuthButton type = "submit" text = 'Добавить' className="boxer-service-content-order-form-holders-second-button"></CustomAuthButton>
                        </form></div></>
                :
                <><div className="boxer-service-content-order-title"><p>Оформление заказа</p></div>
                <div className="boxer-service-content-order-form-holders">
                    <form onSubmit={calculate} className="boxer-service-content-order-form-holders-first">
                        <p>Заполните данные о заказе</p>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Пункт отправления</p>
                        <CustomInput id = "from" placeholder = "пунк о." className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Пункт назначения</p>
                        <CustomInput id = "in"  placeholder = "пункт н." className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Примерное время аренды машины(часы) (в случае перевыполнения плата взымается водителем)</p>
                        <CustomInput id = "time" placeholder = "время" className = "boxer-service-content-order-form-holders-first-input"></CustomInput>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Тариф:</p>
                        <select className="boxer-service-calculator-form-selector">
                            <option>Коммерческий</option>
                            <option>Частный</option>
                            <option>Офисный</option>
                        </select>
                        <CustomAuthButton type = "submit" text = 'Расчитать' className="boxer-service-content-order-form-holders-second-button"></CustomAuthButton>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Цена: {price}</p>
                        <p className="boxer-service-content-order-form-holders-first-placeholder">Выберите дату</p>
                        <input style={{marginBottom: "20px"}} onChange={(e)=>{setDate(e.target.value)}} type="date" id="date" name="trip-start" min={new Date().toISOString().split('T')[0]} />
                    </form>
                    <div className="boxer-service-content-order-form-holders-second">
                        <p>Список грузов</p>
                        <p className="boxer-service-content-order-form-holders-second-placeholder">груз</p>
                        <form onSubmit ={addHandler} className="boxer-service-content-order-form-holders-second-add">
                            <div style={{display: "flex"}}>
                            <CustomInput id = "name" placeholder = "Имя" className = "boxer-service-content-order-form-holders-second-input"></CustomInput>
                            <CustomInput id = "weight" placeholder = "Вес(кг)" className = "boxer-service-content-order-form-holders-second-input"></CustomInput>
                            <CustomInput id = "count" placeholder = "Кол-во" className = "boxer-service-content-order-form-holders-second-input"></CustomInput>
                            </div>
                        <div><CustomAuthButton  type = "submit" text = "Добавить" className="boxer-service-content-order-form-holders-second-button"></CustomAuthButton></div>
                        </form>
                        <div className="boxer-service-content-order-form-holders-second-cargos">
                            {(cargo.map((item, index) =>{
                                return(<div><p>Название: {item.name}</p><p>Вес: {item.weight}</p><p>Количество: {item.quantity}</p><img onClick={(e) => deleteHandler(index, e)} style={{width: "30px", marginRight: "5px", marginLeft: "5px"}} src={returnIcon.svg_icon}/></div>)
                            }))}
                        </div>
                        {!isNaN(totalWeight)  ? <div><p>Общий вес: {totalWeight}</p></div> : <div><p>Неверный ввод</p></div>}
                    </div>
                    <div className="boxer-service-content-order-form-holders-second">
                    <p>Свободные машины</p>
                    <div onClick={() => setShowFilter(!showFilter)} className="gallery-page-content-container-filter-container-filter-selector">
                    <p className="gallery-page-content-container-filter-container-filter-selector-text">{activeFilter.text}</p>
                    {showFilter ?
                    <div>
                        <StandartFilter
                        filters = {car_filters}
                        activeFilter={activeFilter} 
                        clickCallback = {SelectorHandler}
                        />
                    </div>
         
            : 
            <></>
        }</div>
                <div className="boxer-service-content-order-form-holders-second-cargos">
                            {carsList.length === 0 || isNaN(totalWeight) ? <><p>Нет доступных машин, измените дату, вес или тип</p></> : (carsList.map((item, index) =>{
                                return(<div><p>Номер: {item.number}</p><p>Вес: {item.capacity}</p><img onClick={() => {setSelectedCar(item)}} style={{width: "30px", marginRight: "5px", marginLeft: "5px"}} src={link_icon.svg_icon}/></div>)
                            }))}
                </div>
                <div><p>Выбранная машина: </p><p>Номер: {selectedCar.number}</p><p>Вес: {selectedCar.capacity}</p></div>
        </div>
                
                </div>
                {!isNaN(price) && date != null && price != 0 && Object.keys(selectedCar).length !== 0 && !isNaN(totalWeight) && route.departure != route.destination ?  <CustomAuthButton clickCallback = {addOrderHandle} type = "submit" text = "Оформить" className="boxer-service-content-order-form-holders-second-button"></CustomAuthButton> 
                : <><p>Ошибка в оформлении</p></>}
               </>
            }

        </div>
    )
}