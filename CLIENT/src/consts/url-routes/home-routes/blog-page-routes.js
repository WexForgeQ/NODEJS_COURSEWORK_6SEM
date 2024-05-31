import { BlogItemPage } from "../../../pages/home/home-pages";

export const BLOG_PAGE_ROUTES = {
    blog_item: {
        dynamic_link: "/home/blog/item/",
        route: "/home/blog/item/:id",
        element: <BlogItemPage/>
    }
}