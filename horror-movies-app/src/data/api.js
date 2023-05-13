import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data){
    const options = {
        method,
        headers: {}
    }

    const userData = getUserData();

    if(userData){
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token;
    }

    if(data != undefined){
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        let result;

        if(response.status != 204){ // 204 - No content
            result = await response.json();
        }

        if(response.ok != true){
            if(response.status == 403){ // 403 - Unauthorized access
                clearUserData();
            }
            const error = result;
            throw error;
        }

        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');