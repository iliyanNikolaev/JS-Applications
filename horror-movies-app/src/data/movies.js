import { get, del, post, put } from "./api.js";

const endpoints = {
    all: '/data/movies',
    byId: '/data/movies/'
}

export async function getAllMovies(){
    return get(endpoints.all);
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function deleteMovie(id){
    return del(endpoints.byId + id);
}

export async function createMovie(data){
    return post(endpoints.all, data);
}

export async function editMovie(id, data){
    return put(endpoints.byId + id, data);
}