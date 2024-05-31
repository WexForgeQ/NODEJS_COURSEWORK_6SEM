export const ORDER_FETCH_ROUTES = {
    group: "orders",
    getOrders: {
        url: `${process.env.REACT_APP_API_URL}/orders`,
        fetch_name: "orders",
        async_thunk_route: "home/getorders"
    },
    getSingleOrder: {
        url: `${process.env.REACT_APP_API_URL}/orders/singleOrder`,
        fetch_name: "singleOrder",
        async_thunk_route: "home/singleOrder"
    },
    changeOrderStatus: {
        url: `${process.env.REACT_APP_API_URL}/orders/singleOrder`,
        fetch_name: "singleOrder/decl",
        async_thunk_route: "home/singleOrder/decl"
    },
    getCars:{
        url: `${process.env.REACT_APP_API_URL}/orders/cars`,
        fetch_name: "singleOrder/cars",
        async_thunk_route: "home/singleOrder/cars"
    },
    addOrder:{
        url: `${process.env.REACT_APP_API_URL}/orders/add`,
        fetch_name: "singleOrder/add",
        async_thunk_route: "home/singleOrder/add"
    },
    createDriver:{
        url: `${process.env.REACT_APP_API_URL}/orders/`,
        fetch_name: "singleOrder/add",
        async_thunk_route: "home/singleOrder/add"
    }
}