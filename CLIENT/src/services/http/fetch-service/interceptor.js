import { useDispatch } from "react-redux";
import { AUTH_FETCH_ROUTES } from "../../../consts/fetch-routes";
import { useNavigate } from "react-router-dom";
import { AUTH_ACTIONS } from "../../../consts/actions/http";
import { AUTH_ROUTES } from "../../../consts/url-routes";



export class FetchInterceptor {
    static #saveToken(access) {
        console.log()
        localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, access);
    }

    static async #refreshToken() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)}`
            }
        }
        const response = await fetch(AUTH_FETCH_ROUTES.refresh.url, options);
        if (response.status === 200) {
            const body = await response.json();
            this.#saveToken(body);
            return true
        } else {
            return false
        }
    }

    static async request(url, options) {
        const access = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
        options.headers = {
            ...options.headers,
            'authorization': `Bearer ${access}`
        };
        const response = await fetch(url, options);
        if (response.status === 401) {
            const refreshRes = await this.#refreshToken();
            if (refreshRes) {
                return this.request(url, options);
            }
            else{
                localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
                localStorage.removeItem("USERID");
            }
        }
        return response;
    }

}