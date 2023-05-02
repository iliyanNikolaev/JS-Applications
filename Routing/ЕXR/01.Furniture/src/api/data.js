import { get, post, put, del } from "./api.js";

const endpoints = {
    allItems: '/data/catalog',
    getitemById: '/data/catalog/',
    myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    createItem: '/data/catalog',
    editItem: '/data/catalog/',
    deleteItem: '/data/catalog/'
}

export async function getAllItems(){
    return get(endpoints.allItems);
}

export async function getItemById(id){
    return get(endpoints.getitemById + id);
}

export async function getMyItems(userId){
    return get(endpoints.myItems(userId));
}

export async function createItem(data){
    return post(endpoints.createItem, data);
}

export async function editItem(id, data){
    return put(endpoints.editItem + id, data);
}

export async function deleteItem(id){
    return del(endpoints.deleteItem + id);
}

