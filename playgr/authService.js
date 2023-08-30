import * as request from './request.js';
import { setUserData, clearUserData } from './localStorage.js';

const endpoints = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout'
}

export async function login(username, password) {
    try {
        const userData = await request.post(endpoints.login, { username, password });

        setUserData(userData);

        return userData;
    } catch (err) {
        throw err;
    }
}

export async function register(username, password) {
    try {
        const userData = await request.post(endpoints.register, { username, password });

        setUserData(userData);

        return userData;
    } catch (err) {
        throw err;
    }
}

export async function logout() {
    try {
        await request.get(endpoints.logout);

        clearUserData();
    } catch (err) {
        throw err;
    }
}