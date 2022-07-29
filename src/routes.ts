import { Route } from "./core/interfaces/routeconf.interface";
import { ContactPage } from "./pages/contact/contact.page";
import { HomePage } from "./pages/home/home.page";

export const AppRoutes:Route[] = [
    {
        path: "/",
        pageComponent: HomePage
    },
    {
        path: "/contact",
        pageComponent: ContactPage
    }
]