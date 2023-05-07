import { del, get, post, put } from "./api.js";

const pageSize = 3;

const endpoints = {
    allParts: '/data/autoparts',
    byId: '/data/autoparts/'
}

export async function search(query){
    const searchParam = `label LIKE "${query}"`;

    return get(endpoints.allParts + `?where=${encodeURIComponent(searchParam)}`);
}

export async function getParts(page = 1) {
    const offset = (page - 1) * pageSize;

    const [result, count] = await Promise.all([
        get(endpoints.allParts + `?offset=${offset}&pageSize=3`),
        get(endpoints.allParts + '?count')
    ]);

    const pages = Math.ceil(count / pageSize);

    return {
        result,
        pages
    }
}

export async function getDetails(id){
    return get(endpoints.byId + id);
}

export async function deletePart(id){
    return del(endpoints.byId + id);
}

export async function createPart(data){
    return post(endpoints.allParts, data);
}

export async function editPart(id, data){
    return put(endpoints.byId + id, data);
}

