import { del, get, post } from "./api.js";

const catalogURL = '/data/autoparts';

export async function getParts() {
    return get(catalogURL);
}

export async function getDetails(id){
    return get(catalogURL + '/' + id);
}

export async function deletePart(id){
    return del(catalogURL + '/' + id);
}

export async function createPart(data){
    return post(catalogURL, data);
}