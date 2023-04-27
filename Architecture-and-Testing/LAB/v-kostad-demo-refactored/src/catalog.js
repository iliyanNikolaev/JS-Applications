import { getParts } from "./data/data.js";
const catalogSection = document.getElementById('catalog');

const table = catalogSection.querySelector('#table');

export async function showCatalog(){
    document.querySelector('main').replaceChildren(catalogSection);
    
    const parts = await getParts();

    table.replaceChildren(...parts.map(x => createRow(x)));
}

function createRow(record){
    const element = document.createElement('tr');
    element.innerHTML = `
    <td>${record.label}</td>
    <td>€${record.price}</td>
    <td><a href="javascript:void(0)" data-id="${record._id}">Details</a></td>
    `;

    return element;
}