import { get, post, put, del } from "./api.js";
import { createPointer } from "../util.js";

const endpoints = {
    movies: '/classes/Movies',
    byId: '/classes/Movies/'
}

export async function getAll() {
    return get(endpoints.movies);
}

export async function getById(movieId) {
    return get(endpoints.byId + movieId);
}

export async function createMovie(movieData, userId) {
    const finalData = {
        ...movieData,
        owner: createPointer(userId)
    }

    return post(endpoints.movies, finalData);
}

export async function editMovie(movieId, movieData, userId) {
    
    const finalData = {
        ...movieData,
        owner: createPointer(userId)
    }

    return put(endpoints.byId + movieId, movieData); // {updatedAt: '...'}
}

export async function deleteMovie(movieId) {
    return del(endpoints.byId);
}

//https://parseapi.back4app.com/classes/Movies/?where={"title": "Evil Dead Rise"}    >>> req with query params this will returns Evil Dead Rice movie...