import {BoxerServicePage, ServicePageWrapper} from "../../../pages/services";

export const SERVICE_ROUTES = {
    service: {
        route: "/service",
        element: <ServicePageWrapper/>
    },
    boxer: {
        route: "/service/:id",
        dynamic_link: "/service",
        element: <BoxerServicePage/>
    }
}