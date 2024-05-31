import React, {useEffect, useRef, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {HOME_PAGE_WRAPPER_ROUTES, SERVICE_ROUTES } from "../../../../consts/url-routes";
import { ORDERS_PAGE_ROUTES } from "../../../../consts/url-routes";
import '../../../../styles/pages/home/home-pages/gallery/gallery-page.scss'
import { SearchIcon, NotFoundIcon, ArrowIcon } from "../../../../assets/icons";
import { returnIcon } from "../../../../assets/auth-wrapper-page";
import { home_inputs } from "../../../../consts/forms";
import { gallery_filters } from "../../../../consts/forms/filters";
import { CustomButton } from "../../../../reused/gallery/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { StandartFilter } from "../../../../reused/filters/Standartfilter";
import { getOrders } from "../../../../services/http/fetch-service/orders-service";



export const OrdersPage = () => {

    const dispatch = useDispatch()
    const ordersData = useSelector(state => state.orderData.ordersArray)
    const isLoading = useSelector(state => state.fetchData.loading)
    const maxPage = useSelector(state => state.orderData.maxpage)
    const navigate = useNavigate()


    const [page_number, setPage] = useState(1);
    const [loader, SetLoader] = useState(false);
    const [flag, setFlag] = useState(false);
    const [orders, setOrders] = useState([]);
    const [maxpage, setMaxPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState(gallery_filters[0])
    const [showFilter, setShowFilter] = useState()

    const SelectorHandler = (item) =>{
        setShowFilter(!showFilter)
        setActiveFilter(item)
    }
    const SearchHandler = () =>{
            const data = {page_number, activeFilter};
            dispatch(getOrders(data))
    }

    useEffect(() => {
        setOrders(ordersData)
        setMaxPage(maxPage);
      }, [ordersData]);

    useEffect(() => {
        if(flag)
            {
                SearchHandler()
            }
      }, [page_number]);

    useEffect(() => {
        if(flag)
            {
                SearchHandler()
            }
      }, [activeFilter]);

    useEffect(() => {
        if(loader)
            {
                SearchHandler()
                setFlag(true); 
            }
        }, [loader]);

    useEffect(() => {
            SearchHandler()
             SetLoader(true);
        }, []);

    const nextImagePage = (e) => {
        setPage(page_number + 1)
    }

    const prevImagePage = (e) => {
        setPage(page_number - 1)
    }
    var location = useLocation();
    return (
        location.pathname === HOME_PAGE_WRAPPER_ROUTES.orders.route
        ? 
        <>
        {isLoading ? <>LOADING...</> : <>
        <div className="gallery-page-content-container">
            <div className="gallery-page-content-container-filter-container">
                <div className="gallery-page-content-container-filter-container-filter">
                <div className="gallery-page-content-container-filter-container-filter-title"><span>статус:</span></div>
                <div onClick={() => setShowFilter(!showFilter)} className="gallery-page-content-container-filter-container-filter-selector">
                <p className="gallery-page-content-container-filter-container-filter-selector-text">{activeFilter.text}</p>
    {showFilter ?
    <div>
    <StandartFilter
            filters = {gallery_filters}
            activeFilter={activeFilter} 
            clickCallback = {SelectorHandler}
    />
     </div>
     
        : 
        <></>
    }
        </div>
            </div>
            </div>
            <div onClick={()=>setShowFilter(false)}  className ="gallery-page-content-container-images-gallery">
                    {(orders.length > 0) ? <><div className="gallery-page-content-container-images-gallery-images-found">{(orders.map((item, index) =>{
                        let borderStyle = "";

                        if (item.order_status === "Выполнен") {
                          borderStyle = "gallery-page-content-container-images-grid-ready";
                        } else if (item.order_status === "Забронирован") {
                          borderStyle = "gallery-page-content-container-images-grid-not-ready";
                        } else if (item.order_status === "Ожидает подтверждения") {
                            borderStyle = "gallery-page-content-container-images-grid-reserved";
                        }
                        else if (item.order_status === "Отменён") {
                            borderStyle = "gallery-page-content-container-images-grid-declined";
                        }
                        const date = new Date(item.order_date);
                        const formattedDate = date.toLocaleDateString();
                       return <div key = {index} onClick={()=>navigate(`${ORDERS_PAGE_ROUTES.order.dynamic_link}/${item.id}`)} className={borderStyle}>
                        <p>Заказ №{item.id}</p><p> Дата: {formattedDate}</p><p> Статус: {item.order_status}</p>
                        </div>
                    }))}</div></> : <>
                    
                    <div className = "gallery-page-content-container-not-found">
                        <span className = "gallery-page-content-container-not-found-text">К сожалению, у вас нет заказов такого статуса</span>
                        <div className="gallery-page-content-container-not-found-img"><img src={NotFoundIcon.svg_icon} alt_prop = {NotFoundIcon.alt_prop}></img></div>
                        <CustomButton clickCallback = {() => navigate(SERVICE_ROUTES.chagall.route)} text = "Переидти на страницу оформления" divClassName = "gallery-page-content-container-page-scroll-button" className = "gallery-page-content-container-not-found-button"></CustomButton>
                    </div>
                    
                    
                    </>}
            </div>
        <div className="gallery-page-content-container-page-scroll">
            <div className="gallery-page-content-container-page-scroll-buttons-container">
                {
                    maxPage === 1 ? <></> :
                    page_number === 1 ? <><CustomButton clickCallback = {nextImagePage} icon = {ArrowIcon} text = "Далее" divClassName = "gallery-page-content-container-page-scroll-button" className = "gallery-page-content-container-page-scroll-button-button"></CustomButton></> :
                    page_number === maxpage ? <><img style={{marginRight: "0"}} onClick = {prevImagePage} className="gallery-page-content-container-page-scroll-buttons-container-return-button" src = {returnIcon.svg_icon}></img></> :
                    <>
                    <img onClick = {prevImagePage} className="gallery-page-content-container-page-scroll-buttons-container-return-button" src = {returnIcon.svg_icon}></img>
                    <CustomButton clickCallback = {nextImagePage} icon = {ArrowIcon}  text = "Далее" divClassName = "gallery-page-content-container-page-scroll-button" className = "gallery-page-content-container-page-scroll-button-button"></CustomButton>
                    </>
                }
            </div>
        </div>
        {maxPage == 0 ? <></> :
        <div className="gallery-page-content-container-page-scroll-pages-routing"><span>Страница</span><span className="gallery-page-content-container-page-scroll-pages-routing-decorative-number">{page_number}</span><span>из {maxpage}</span></div>}
        </div>
        </>}
        </>
        :
        <>
            <Outlet/>
        </>
    )
}