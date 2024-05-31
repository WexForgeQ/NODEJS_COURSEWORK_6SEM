import {BlogPage, HomePage, OrdersPage } from "../../../pages/home/home-pages";

export const HOME_PAGE_WRAPPER_ROUTES = {
    home: {
        route: "/home",
        element: <HomePage />
    },
    orders: {
        route: "/home/orders",
        element: <OrdersPage/>
    },
    blog: {
        route: "/home/blog",
        element: <BlogPage/>
    }
} 