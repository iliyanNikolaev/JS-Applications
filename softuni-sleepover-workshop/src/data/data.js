import { addOwner, getUserData } from "../util.js";
import { get, post, put, del } from "./api.js";

const endpoints = {
    all: '/classes/Room',
    byId: '/classes/Room/'
}

export async function getAllRooms(){
    return get(endpoints.all);
}

export async function getRoomById(roomId){
    return get(endpoints.byId + roomId);
}

export async function createRoom(roomData, userId){
    
    const data = addOwner(roomData, userId)

    return post(endpoints.byId, data);
}

export async function editRoom(roomId, roomData, userId){
    
    const data = addOwner(roomData, userId);

    return put(endpoints.byId + roomId, data);
}

export async function deleteRoom(roomId){
    return del(endpoints.byId + roomId);
}