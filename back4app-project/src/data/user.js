import { deleteUserData, setUserData } from '../util.js';
import { get, post } from './api.js';

const endpoints = {
    register: '/users',
    login: '/login',
    logout: '/logout'
}

export async function register(username, password) {
    try {
        const response = await post(endpoints.register, { username, password }); // {objectId: '...', createdAt: '...', sessionToken: '...'}
        
        setUserData({
            objectId: response.objectId,
            sessionToken: response.sessionToken,
            username
        });

    } catch (err) {
        console.log(err.message);
    }
}

export async function login(username, password) {
    try {
        const response = await post(endpoints.login, { username, password }); // {objectId: '...', username: '...', createdAt: '...', updatedAt: '...', sessionToken: '...' ACL: {…}, …}
        
        setUserData({
            objectId: response.objectId,
            sessionToken: response.sessionToken,
            username
        });
    } catch (err) {
        console.log(err.message);
    }
}

export async function logout() {
    await post(endpoints.logout, {});

    deleteUserData();
}