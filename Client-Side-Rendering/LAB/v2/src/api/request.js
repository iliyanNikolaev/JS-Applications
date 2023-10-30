const host = 'http://localhost:3030';

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
        const res = await fetch(host + url, options);
        if (!res.ok) {
            if (res.status == 403) {
                deleteUserData();
            }
            const error = await res.json();
            throw error;
        }
        if (res.status == 201) {
            return res;
        }
        const result = await res.json();
        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export function getUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
}

export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

function deleteUserData() {
    localStorage.removeItem('userData');
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'del');