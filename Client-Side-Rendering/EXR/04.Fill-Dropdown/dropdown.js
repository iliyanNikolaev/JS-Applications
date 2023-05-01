import { html, render } from 'https://unpkg.com/lit-html?module';

const selectElement = document.querySelector('#menu')
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const [inputTextArea, inputSubmitBtn] = document.querySelectorAll('input');

inputSubmitBtn.addEventListener('click', addItem);

const itemTemplate = (text, _id) => html`<option value="${_id}">${text}</option>`

let itemsArr = [];

init();

async function init() {
    const items = await request('get', url);

    itemsArr = Object.values(items);

    render(itemsArr.map(item => itemTemplate(item.text, item._id)), selectElement);
}

async function addItem(e) {
    e.preventDefault();

    const text = inputTextArea.value;

    const item = await request('post', url, { text });

    itemsArr.push(item);

    render(itemsArr.map(item => itemTemplate(item.text, item._id)), selectElement);

    inputTextArea.value = '';
}


async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options['body'] = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, options);
        if (response.ok != true) {
            const error = response.json();
            throw new Error(error.message);
        }
        if (response.status == 204) {
            const error = response.json();
            throw new Error('204 - No content!');
        }

        return response.json();
    } catch (err) {
        alert(err.message);
    }
}

window.request = request;