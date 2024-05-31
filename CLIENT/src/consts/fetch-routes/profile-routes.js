export const PROFILE_FETCH_ROUTES = {
    group: "profile",
    getUserInfo: {
        url: `${process.env.REACT_APP_API_URL}/user/userinfo/`,
        fetch_name: "userinfo",
        async_thunk_route: "user/userinfo/"
    },
    updateUserInfo: {
        url: `${process.env.REACT_APP_API_URL}/user/userinfo/`,
        fetch_name: "userinfoupdt",
        async_thunk_route: "user/userinfo/updt"
    },
    createDriver:{
        url: `${process.env.REACT_APP_API_URL}/user/driver`,
        fetch_name: "userindffoupdt",
        async_thunk_route: "user/userinfo/updfdt"
    }
}