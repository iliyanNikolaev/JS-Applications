import { getUserData, clearUserData } from "./localStorage.js";

const host = 'http://localhost:3001';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
        const result = await response.json();

        if(response.status == '400') {
            throw new Error(result.error);
        }

        return result;
    } catch (err) {
        
        if(err.message == 'Invalid access token!'){
            clearUserData();
        }

        throw err;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');


