import React, { useState } from "react"
import { useEffect } from "react"
import {useLocation, useNavigate, useParams} from "react-router-dom"
import { returnIcon } from "../../../../../assets/auth-wrapper-page"
import '../../../../../styles/pages/home/home-pages/order/order-page/order-page.scss'
import Sad from '../testimg/TerenceSad.jpg'
import { CustomButton } from "../../../../../reused/gallery/buttons/CustomButton";
import { ShareIcon } from "../../../../../assets/icons"
import { useDispatch, useSelector } from "react-redux";
import { addPopularity, getAuthorImages, getsingleOrder, role } from "../../../../../services/http/fetch-service"
import { ORDERS_PAGE_ROUTES} from "../../../../../consts/url-routes"
import { changeOrderStatus, getSingleOrder } from "../../../../../services/http/fetch-service/orders-service"

export const SingleOrdersPage = () => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    const id = parts[parts.length - 1];
    const [loader, SetLoader] = useState(false);
    const [date, setDate] = useState("")
    const [singleOrders, setSingleOrder] = useState(null);
    const isLoading = useSelector(state => state.fetchData.loading)
    const singleOrder= useSelector(state => state.orderData.singleOrder)
    const [status, setStatus] = useState("Выполнен")
    const dispatch = useDispatch()

    const user_role = useSelector(state => state.authData.user_role)


    const handleChange = () => {
        const status = "Отменён";
        const data = {id, status}
        dispatch(changeOrderStatus(data))
        dispatch(getSingleOrder(data));
    };
    const startChange = () =>{
        const status = "Выполняется";
        const data = {id, status}
        dispatch(changeOrderStatus(data))
        dispatch(getSingleOrder(data));
    }
    const finishChange = () =>{
        const status = "Выполнен";
        const data = {id, status}
        dispatch(changeOrderStatus(data))
        dispatch(getSingleOrder(data));
    }
    const submitChange = () => {
        const status = "Забронирован";
        const data = {id, status}
        dispatch(changeOrderStatus(data))
        dispatch(getSingleOrder(data));
    };
    
    const imageHandler = () => {
        const data = { id };
        console.log(data);
        dispatch(getSingleOrder(data));
        if (singleOrder.order) {
          const date = new Date(singleOrder.order.order_date);
          setDate(date.toLocaleDateString());  
        }
    };

    useEffect(() => {
        if (singleOrder.order) {
          const date = new Date(singleOrder.order.order_date);
          setDate(date.toLocaleDateString());
          setStatus(singleOrder.order.order_status)
        }
    }, [singleOrder]);

    useEffect(() => {
        if(loader)
            {
                imageHandler();
            }
        }, [loader]);

    useEffect(() => {
            console.log(singleOrder)
             SetLoader(true);
        }, []);


    const navigate = useNavigate()
    return (
    <div className="order-page-content-container">
         {isLoading ? <></> : <>
        <div onClick={() => navigate(-1)} className="order-page-content-container-return-button">
        <img src = {returnIcon.svg_icon}></img>
        <p className="order-page-content-container-return-button-text">Назад</p>
        </div>
        <div className="order-page-content-container-placeholder"><span>Заказ №{singleOrder && singleOrder.order && singleOrder.order.id} Статус: {singleOrder && singleOrder.order && singleOrder.order.order_status}</span></div>
        <div className="order-page-content-container-order-info">
        <div className="order-page-content-container-order-info-text-container">
        <div className="order-page-content-container-order-info-text-container-properties"><span>Автомобиль: </span>   {singleOrder.order && singleOrder.order.car_id}</div>
        <div className="order-page-content-container-order-info-text-container-properties"><span>Водитель: </span><span>{singleOrder.driver && singleOrder.driver.fio}</span></div>
        <div className="order-page-content-container-order-info-text-container-properties"><span>Номер водителя: </span><span>{singleOrder.driver && singleOrder.driver.phone}</span></div>
        <div className="order-page-content-container-order-info-text-container-properties"><span>Пункт отправления: </span> {singleOrder.order && singleOrder.order.departure_point}</div>
        <div className="order-page-content-container-order-info-text-container-properties"><span>Пункт прибытия: </span> {singleOrder.order && singleOrder.order.destination_point}</div>      
            {status === "Выполнен" || status === "Выполняется" ? <>
            <div className="order-page-content-container-order-info-text-container-buttons-container">
                {user_role == 1 && status == "Выполняется" ? <><CustomButton clickCallback = {finishChange} text = "Завершить" className = "order-page-content-container-order-info-text-container-buttons-container-download">
                </CustomButton></> : <></>}
            </div></> 
            :<>
            {user_role == 0 && status == "Ожидает подтверждения" ? <>
            <div className="order-page-content-container-order-info-text-container-buttons-container">
            <CustomButton clickCallback = {handleChange} text = "Отменить" className = "order-page-content-container-order-info-text-container-buttons-container-download">
            </CustomButton>
            <CustomButton clickCallback = {submitChange} text = "Подтвердить" className = "order-page-content-container-order-info-text-container-buttons-container-download">
            </CustomButton></div></> : <div className="order-page-content-container-order-info-text-container-buttons-container">
                {user_role == 1 && status == "Забронирован" ? <><CustomButton clickCallback = {startChange} text = "Приступить" className = "order-page-content-container-order-info-text-container-buttons-container-download">
                </CustomButton></> : <> <CustomButton clickCallback = {handleChange} text = "Отменить" className = "order-page-content-container-order-info-text-container-buttons-container-download">
                </CustomButton></>}
            </div>}</>}
        <div className="order-page-content-container-order-info-text-container-properties-author-date">
            <div className="order-page-content-container-order-info-text-container-properties-author"><span>Заказчик:</span><span>{singleOrder.customer && singleOrder.customer.fio}</span></div>
            <div className="order-page-content-container-order-info-text-container-properties-date"><span>Дата выполнения:</span><span>{date}</span></div>
            <div className="order-page-content-container-order-info-text-container-properties-date"><span>Стоимость:</span><span>{singleOrder.customer && singleOrder.order.price} BYN</span></div>
        </div>
        </div>
        </div>
        <div className="order-page-content-container-placeholder-other">Список грузов:</div>
        {<div className="order-page-content-container-other-orders">
            {(singleOrder.cargos && singleOrder.cargos.map((item, index) =>{
                       return(<div><p>Название: {item.name}</p><p>Вес: {item.weight}</p><p>Количество: {item.quantity}</p></div>)
                    }))}
        </div>}</>}
    </div>)
}