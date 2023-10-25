import { post, setUserData } from "./request.js";

export async function login(email, password) {
    try {
        const userData = await post('/users/login', { email, password });
        setUserData(userData);
    } catch (err) {
        throw err;
    }
}