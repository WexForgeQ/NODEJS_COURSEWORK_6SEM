import { ProfilePageWrapper } from "../../../pages/profile/ProfilePageWrapper";
import { UserProfilePage, CurrentUserProfilePage } from "../../../pages/profile/sub-pages";

export const PROFILE_ROUTES = {
    profile: {
        route: "/profile",
        element: <ProfilePageWrapper />
    },
    current_user_profile: {
        route: "/profile/me",
        element: <CurrentUserProfilePage/>
    },
    user_profile: {
        route: "/profile/:id",
        element: <UserProfilePage/>
    }
}