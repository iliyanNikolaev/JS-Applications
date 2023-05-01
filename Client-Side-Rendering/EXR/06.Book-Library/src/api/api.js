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
    try {
       const response = await fetch(host + url, options);
       if (response.ok != true) {
          const error = response.json();
          throw new Error(error.message);
       }
       if (response.status == 204) {
          const error = response.json();
          throw new Error('204 - No content!');
       }
 
       return response.json();
    } catch (err) {
       alert(err.message);
    }
 }

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');