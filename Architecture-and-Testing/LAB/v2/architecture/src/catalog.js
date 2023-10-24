import { showDetails } from './details.js'
import { getData } from './api.js';
const catalogView = document.querySelector('#catalog-view');
const root = document.querySelector('#root');
const loading = document.createElement('p');
loading.textContent = 'Loading...'
const table = document.querySelector('#table');

export async function showCatalog() {
    root.replaceChildren(catalogView);
    table.replaceChildren(loading);
    const parts = await getData('http://localhost:3030/data/laptops');
    table.replaceChildren(...parts.map(createTableRow));
}

function createTableRow(record) {
    const { _id, brand, gpu, cpu } = record;
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${_id}</td>
    <td>${brand}</td>
    <td>${gpu}</td>
    <td>${cpu}</td>
    <td>
        <button class="edit-btn">Details</button>
    </td>`;
    tr.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.target.disabled = true;
        e.target.textContent = 'loading...';
        showDetails(_id)
    });
    return tr;
}
