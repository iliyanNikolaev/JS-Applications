import { get } from "./api.js";

const endpoints = {
    catalog: '/data/autoparts'
}
export async function getParts() {
    return get(endpoints.catalog);
}