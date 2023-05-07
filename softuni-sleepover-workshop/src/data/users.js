import { setUserData } from "../util.js";
import { post } from "./api.js";

export async function register(email, username, password) {
    const { sessionToken, objectId } = await post('/users', { email, username, password });

    const userData = {
        sessionToken,
        objectId,
        email,
        username
    }

    setUserData(data);
}


export async function login(username, password) {
    const response = await post('/login', { username, password });

    const userData = {
        sessionToken: response.sessionToken,
        objectId: response.objectId,
        email: response.email,
        username: response.username
    }

    setUserData(userData);
}




