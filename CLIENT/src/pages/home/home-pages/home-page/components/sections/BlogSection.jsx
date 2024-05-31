import React, { useState, useEffect } from "react";
import { link_icon } from "../../../../../../assets/icons/home-page";
import { blog1_png, blog2_png, blog3_png, blog4_png, about_us2_png } from "../../../../../../assets/pages/home-page";
import { useNavigate } from "react-router-dom";
import { BLOG_PAGE_ROUTES, HOME_PAGE_WRAPPER_ROUTES } from "../../../../../../consts/url-routes";

export const BlogSection = () => {

    const newsSource = [
        { id: 1, title: "Минивэны", image: blog1_png },
        { id: 2, title: "Без верха", image: blog2_png },
        { id: 3, title: "Фуры", image: blog3_png },
        { id: 4, title: "Грузовики", image: about_us2_png },
    ]

    const navigate = useNavigate();
    const [newsPage, setNewsPage] = useState(1);
    const newsPerPage = 3;
    const [newsPageCount, setNewsPageCount] = useState(Math.ceil(newsSource.length / newsPerPage))
    const [news, setNews] = useState([]);

    useEffect(() => {
        const start = (newsPage - 1) * newsPerPage;
        const end = start + newsPerPage;
        const cloned = newsSource.slice(start, end);
        setNews(cloned);
    }, [newsPage])

    const nextNewsPage = (e) => {
        if (newsPage < newsPageCount) {
            setNewsPage(newsPage + 1)
        }
    }

    const prevNewsPage = (e) => {
        if (newsPage > 1) {
            setNewsPage(newsPage - 1)
        }
    }

    return (
        <>
            <div className="home-page-content-section-title">
                Автопарк
            </div>
            <div className="home-page-content-section-list-container ">
                <div className="home-page-content-section-list-news">
                    {news?.map((item, index) => {
                        return <div key={index} className="home-page-content-section-list-news-item">
                            <img className="home-page-content-section-list-news-item-image"
                                src={item.image.png}
                                alt={item.image.alt_prop}
                            />
                            <div className="home-page-content-section-list-news-item-title">
                                {item.title}
                            </div>
                        </div>
                    })}
            </div>
            <div className="home-page-content-section-list-pagination">
                <div className="home-page-content-section-list-pagination-arrows">
                    <svg cursor={newsPage > 1 ? "pointer" : ""} width="69" height="30" viewBox="0 0 69 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={prevNewsPage}>
                        <g clipPath="url(#clip0_2392_6)">
                            <path
                                d="M67 17.0004C68.1046 17.0004 69 16.105 69 15.0004C69 13.8958 68.1046 13.0004 67 13.0004V17.0004ZM0.585783 13.5862C-0.195261 14.3672 -0.195261 15.6336 0.585783 16.4146L13.3137 29.1425C14.0948 29.9236 15.3611 29.9236 16.1421 29.1425C16.9232 28.3615 16.9232 27.0952 16.1421 26.3141L4.82843 15.0004L16.1421 3.68667C16.9232 2.90562 16.9232 1.63929 16.1421 0.858247C15.3611 0.0771989 14.0948 0.0771989 13.3137 0.858247L0.585783 13.5862ZM67 13.0004H2V17.0004H67V13.0004Z"
                                style={{ transition: "0.3s" }} fill={newsPage > 1 ? "#838383" : "#BBBBBB"} />
                        </g>

                    </svg>
                    <svg cursor={newsPage < newsPageCount ? "pointer" : ""} width="69" height="30" viewBox="0 0 69 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={nextNewsPage}>
                        <g clipPath="url(#clip0_2392_8)">
                            <path
                                d="M2 13.0004C0.895431 13.0004 9.65645e-08 13.8958 0 15.0004C-9.65645e-08 16.105 0.89543 17.0004 2 17.0004V13.0004ZM68.4142 16.4146C69.1953 15.6336 69.1953 14.3672 68.4142 13.5862L55.6863 0.858248C54.9052 0.0771988 53.6389 0.0771987 52.8579 0.858248C52.0768 1.6393 52.0768 2.90563 52.8579 3.68668L64.1716 15.0004L52.8579 26.3141C52.0768 27.0952 52.0768 28.3615 52.8579 29.1425C53.6389 29.9236 54.9052 29.9236 55.6863 29.1425L68.4142 16.4146ZM2 17.0004H67V13.0004H2V17.0004Z"
                                style={{ transition: "0.3s" }} fill={newsPage < newsPageCount ? "#838383" : "#BBBBBB"} />
                        </g>
                    </svg>
                </div>
                <div className="home-page-content-section-list-pagination-pages">
                    {Array.from({ length: newsPageCount }).map((_, index) => {
                        return newsPage === index + 1
                            ? <div key={index} className={"home-page-content-section-list-pagination-pages-selected"}>
                            </div>
                            : <div key={index} onClick={() => setNewsPage(index + 1)} className={"home-page-content-section-list-pagination-pages-unselected"}>
                            </div>
                    })}
                </div>
            </div>
        </div >
        </>
    )
}