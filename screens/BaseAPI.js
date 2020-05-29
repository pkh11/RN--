import Axios from "axios";




const API = {
    getHeaders(accessToken) {
        return{

        };
    },

    requestAPI(url, reqInit, options = {}){
        const headers = '';
        const init = Object.assign({}, reqInit, { headers });
        Axios({
            url,
            ...init,
            timeout: 30000,
            withCredentials: process.env.NODE_ENV === 'production',
        }).then().then().catch();
    }
}