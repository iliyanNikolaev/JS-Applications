import { appKey, jsKey } from "./constants.js";
const host = 'https://parseapi.back4app.com';

// dom elements
const tbody = document.querySelector('tbody');
const postBtn = document.querySelector('#post-btn');
const inputElements = {
    brand: document.querySelector('#brand'),
    model: document.querySelector('#model'),
    vram: document.querySelector('#vram'),
    price: document.querySelector('#price'),
}

// attach events
postBtn.addEventListener('click', postHandler);
tbody.addEventListener('click', handleClickOnTable);

// start app
async function onLoad() {
    await rednerGPUs();
}

onLoad();

// render functions
async function rednerGPUs() {
    try {
        // clear table
        tbody.innerHTML = '';
        // get gpus from base
        const gpus = await getGPUs();
        if (gpus.error) {
            throw new Error(gpus.error);
        }
        // render gpus in the table
        gpus.results.map(x => appendTableRow(x));
    } catch (err) {
        return alert(err.message);
    }
}

function appendTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <th>${data.brand}</th>
    <th>${data.model}</th>
    <th>${data.vram} GB</th>
    <th>${data.price} BGN</th>
    <th>
    <button id="${data.objectId}">Edit</button>
    <button id="${data.objectId}">Delete</button>
    </th>`;

    tbody.appendChild(row);
}

// event handlers
function handleClickOnTable(e) {
    if (e.target.tagName != 'BUTTON') {
        return;
    }

    const itemId = e.target.id;

    switch (e.target.textContent) {
        case 'Edit':
            editHandler(itemId);
            break;
        case 'Delete':
            deleteHandler(itemId);
            break;
    }
}

async function postHandler() {
    //get data from inputs
    const data = {
        brand: inputElements.brand.value,
        model: inputElements.model.value,
        vram: Number(inputElements.vram.value),
        price: Number(inputElements.price.value)
    }
    //validate data
    if (data.brand == ''
        || data.model == ''
        || data.vram == '' || Number.isNaN(data.vram)
        || data.price == '' || Number.isNaN(data.price)) {
        return alert('invalid data');
    }
    //send data to base
    try {
        const created = await postGPU(data);
        if (created.error) {
            throw new Error(created.error);
        }
        for (const element in inputElements) {
            inputElements[element].value = '';
        }
        rednerGPUs();
    } catch (err) {
        return alert(err.message);
    }
}

async function editHandler(itemId) {
    try {
        const currentRow = tbody.querySelector(`#${itemId}`).parentElement.parentElement;
        currentRow.className = 'edit-form-row';
        const currentItem = await getGPUById(itemId);
        if (currentItem.error) {
            throw new Error(currentItem.error);
        }
        currentRow.innerHTML = `
        <th><input type="text" id="brand-edit-${itemId}" value="${currentItem.brand}"></th>
        <th><input type="text" id="model-edit-${itemId}" value="${currentItem.model}"></th>
        <th><input type="number" id="vram-edit-${itemId}" value="${currentItem.vram}"></th>
        <th><input type="number" id="price-edit-${itemId}" value="${currentItem.price}"></th>
        <th>
        <button id='save-btn'>Save</button>
        </th>`;

        currentRow.querySelector('#save-btn').addEventListener('click', () => saveEdited(itemId, currentRow));
    } catch (err) {
        return alert(err.message);
    }
}

async function saveEdited(id, currentRow) {
    try {
        const editInputElements = {
            brand: document.querySelector('#brand-edit-' + id),
            model: document.querySelector('#model-edit-' + id),
            vram: document.querySelector('#vram-edit-' + id),
            price: document.querySelector('#price-edit-' + id),
        }

        const data = {
            brand: editInputElements.brand.value,
            model: editInputElements.model.value,
            vram: Number(editInputElements.vram.value),
            price: Number(editInputElements.price.value)
        }
        //validate data
        if (data.brand == ''
            || data.model == ''
            || data.vram == '' || Number.isNaN(data.vram)
            || data.price == '' || Number.isNaN(data.price)) {
            return alert('invalid data');
        }

        const edited = await editGPUById(id, data);
        if (edited.error) {
            throw new Error(edited.error);
        }
        rednerGPUs();
        currentRow.className = '';
    } catch (err) {
        return alert(err.message);
    }
}

async function deleteHandler(itemId) {
    try {
        const choice = confirm('Are you sure you want to delete this item?');
        if (choice) {
            const deleted = await deleteGPUById(itemId);
            if (deleted.error) {
                throw new Error(deleted.error);
            }
            rednerGPUs();
        }
    } catch (err) {
        return alert(err.message);
    }
}

// api functions
async function getGPUs() {
    const res = await fetch(host + '/classes/GPUs', {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-JavaScript-Key': jsKey
        }
    });
    const data = await res.json();
    return data;
}

async function postGPU(data) {
    const response = await fetch(host + '/classes/GPUs', {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-JavaScript-Key': jsKey
        },
        body: JSON.stringify(data)
    });
    const created = await response.json();
    return created;
}

async function getGPUById(id) {
    const res = await fetch(host + '/classes/GPUs/' + id, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-JavaScript-Key': jsKey
        }
    });
    const data = await res.json();
    return data;
}

async function editGPUById(id, data) {
    const res = await fetch(host + '/classes/GPUs/' + id, {
        method: 'put',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-JavaScript-Key': jsKey
        },
        body: JSON.stringify(data)
    });
    const edited = await res.json();
    return edited;
}

async function deleteGPUById(id) {
    const res = await fetch(host + '/classes/GPUs/' + id, {
        method: 'delete',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-JavaScript-Key': jsKey
        }
    });
    const deleted = await res.json();
    return deleted;
}