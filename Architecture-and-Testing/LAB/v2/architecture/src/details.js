import { getData } from "./api.js";
const root = document.querySelector('#root'); 
const detailsView = document.querySelector('#details-view');
const idEl = document.querySelector('#_id');
const brandEl = document.querySelector('#brand');
const gpuEl = document.querySelector('#gpu');
const cpuEl = document.querySelector('#cpu');

export async function showDetails(id) {
    const details = await getData('http://localhost:3030/data/laptops/'+id);

    idEl.textContent = details._id;
    brandEl.textContent = details.brand;
    gpuEl.textContent = details.gpu;
    cpuEl.textContent = details.cpu;
    
    root.replaceChildren(detailsView);
}