import { del, get } from "./api.js";

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