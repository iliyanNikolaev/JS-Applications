import { getUserData, removeUserData } from "../utill.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
       method,
       headers: {},
    }
    if (data != undefined) {
       options.headers['Content-Type'] = 'application/json';
       options['body'] = JSON.stringify(data);
    }

    const userData = getUserData();
    if(userData != null){
       options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
       const response = await fetch(host + url, options);
       if (response.status == 204) {
         const error = response.json();
         throw new Error('204 - No content!');
      }

       if (response.ok != true) {
         if(response.status == 403){ // invalid token
            removeUserData();
         }

          const error = await response.json();
          throw new Error(error.message);
       }
       
       return response.json();
       
    } catch (err) {
       alert(err.message);
       throw err;
    }
 }

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');