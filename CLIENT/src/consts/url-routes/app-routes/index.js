import { AuthPageWrapper } from "../../../pages/auth/AuthPageWrapper";
import { HomePageWrapper } from "../../../pages/home/HomePageWrapper";
import { NotFoundPage } from "../../../pages/not-found/NotFoundPage";

export const APP_ROUTES = {
    auth: {
        route: "/auth",
        element: <AuthPageWrapper />
    },
    home: {
        route: "/",
        element: <HomePageWrapper/>
    },
    not_found: {
        route: "*",
        element: <NotFoundPage/>
    }
}