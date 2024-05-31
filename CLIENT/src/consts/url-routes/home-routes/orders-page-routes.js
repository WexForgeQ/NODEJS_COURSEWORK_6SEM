import { SingleOrdersPage} from "../../../pages/home/home-pages"

export const ORDERS_PAGE_ROUTES = {
    order: {
        dynamic_link: "/home/orders/order",
        route: "/home/orders/order/:id",
        element: <SingleOrdersPage />
    }
}