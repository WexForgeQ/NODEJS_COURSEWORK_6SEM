
export const GALLERY_FETCH_ROUTES = {
    group: "gallery",
    getImages: {
        url: `${process.env.REACT_APP_API_URL_GALLERY}/generation/gallery/`,
        fetch_name: "images",
        async_thunk_route: "home/images"
    },
    getSingleImage: {
        url: `${process.env.REACT_APP_API_URL_GALLERY}/generation/gallery/picture/`,
        fetch_name: "singleImage",
        async_thunk_route: "home/singleImage"
    },
    getAuthorImages: {
        url: `${process.env.REACT_APP_API_URL_GALLERY}/generation/gallery/`,
        fetch_name: "authorImages",
        async_thunk_route: "home/authorImages"
    },
    addPopularity: {
        url: `${process.env.REACT_APP_API_URL_GALLERY}/generation/gallery/picture/`,
        fetch_name: "/singleImage/popularity",
        async_thunk_route: "home/singleImage/popularity"
    }
}