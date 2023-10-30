import { get } from "./request.js";

async function getLaptops() {
    try {
        const laptops = await get('/data/laptops');
        return laptops;
    } catch (err) {
        throw err;
    }
}
async function getLaptopById(id) {
    try {
        const laptops = await get('/data/laptops/'+id);
        return laptops;
    } catch (err) {
        throw err;
    }
}

export {
    getLaptops,
    getLaptopById
}