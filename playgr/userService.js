import * as request from "./request.js";

const endpoints = {
    byId: '/api/users/'
}

export async function getUserById(id) {
    try {
        const user = await request.get(endpoints.byId + id);

        return user;
    } catch (err) {
        throw err;
    }
}