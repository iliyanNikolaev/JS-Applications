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

    setUserData(userData);
}


export async function login(username, password) {
    const { objectId, sessionToken, email } = await post('/login', { username, password });

    const userData = {
        email,
        objectId,
        sessionToken,
        username
    }

    setUserData(userData);
}




