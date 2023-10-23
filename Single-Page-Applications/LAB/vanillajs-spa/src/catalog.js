import { showDetails } from './details.js'
const catalogView = document.querySelector('#catalog-view');
const root = document.querySelector('#root');
const loading = document.createElement('p');
loading.textContent = 'Loading...'
const table = document.querySelector('#table');

export async function showCatalog() {
    root.replaceChildren(catalogView);
    table.replaceChildren(loading);
    const options = {
        method: 'get',
        headers: {}
    }
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    try {
        const res = await fetch('http://localhost:3030/data/laptops', options);
        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
        const data = await res.json();
        table.replaceChildren(...data.map(createTableRow));
    } catch (err) {
        return alert(err.message);
    }
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
    tr.querySelector('.edit-btn').addEventListener('click', () => showDetails(_id));
    return tr;
}

{/* <tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr> */}