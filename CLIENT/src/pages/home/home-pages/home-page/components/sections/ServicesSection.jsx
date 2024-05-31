import React, { useState, useEffect } from "react";
import { service1_png, service2_png, service3_png } from "../../../../../../assets/pages/home-page";
import { link_icon } from "../../../../../../assets/icons/home-page";
import { useNavigate } from "react-router-dom";
import { SERVICE_ROUTES } from "../../../../../../consts/url-routes";

export const ServicesSection = () => {

    const servicesSource = [
        { img: service1_png, name: "Коммерческие", id: 0, status: true, message: "" },
        { img: service2_png, name: "Офисные", id: 1, status: true, message: "" },
        { img: service3_png, name: "Частные", id: 2, status: true, message: "" },
    ];
    const [servicesPage, setServicesPage] = useState(1);
    const servicesPerPage = 3;
    const [servicesPageCount, setServicesPageCount] = useState(Math.ceil(servicesSource.length / servicesPerPage));
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const start = (servicesPage - 1) * servicesPerPage;
        const end = start + servicesPerPage;
        const cloned = servicesSource.slice(start, end);
        setServices(cloned);
    }, [servicesPage])

    const linkHandle = (name) => {
        navigate(`${SERVICE_ROUTES.service.route}/${name}`)
    }

    return (
        <>
            <div className="home-page-content-section-title">
                Услуги
            </div>
            <div className="home-page-content-section-list-container">
                <div className="home-page-content-section-list-services">
                    {services?.map((item, index) => {
                        return <div className="home-page-content-section-list-services-item" style={{ cursor: item.status ? "pointer" : "" }} key={index}>
                            <img className="home-page-content-section-list-services-item-image" src={item.img.png} alt={item.img.alt_prop} />
                            <div className="home-page-content-section-list-services-item-name">
                                {item.name}
                            </div>
                            {item.status
                                ? <div className="home-page-content-section-list-services-item-status-true" onClick={() => linkHandle(item.name.toLowerCase())}>
                                    <img src={link_icon.svg_icon} alt={link_icon.alt_prop} />
                                </div>
                                : <div className="home-page-content-section-list-services-item-status-false">
                                    {item.message}
                                </div>
                            }
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}