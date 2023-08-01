import { getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

//Application keys
const appId = 'xTOEfVwMLuZry6uuZxgtr7qIo4j1vZ7Kl8kUjG3n';
const apiKey = 'hlxoQhjrB3YQ9wBnBWbc8PpnVT7BkjdtPq4lfSC2'; // JavaScript Key

async function request(method, url = '/', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-Javascript-Key': apiKey
        }
    };

    const userData = getUserData();

    if(userData != null) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    //TODO: Add authorization headers
    
    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) { // no-content
            return response;
        }

        const result = await response.json();

        if(response.ok != true){
            throw new Error(result.message || result.error);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');