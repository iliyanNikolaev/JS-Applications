import { appKey, jsKey } from '../constants.js'

document.querySelector('button').addEventListener('click', loadLaptops);

function loadLaptops() {
    const url = 'https://parseapi.back4app.com/classes/Laptops';
    fetch(url, {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': appKey,
            'X-Parse-Javascript-Key': jsKey
        }
    }).then(headersHandler).catch(errorHandler);
}

function headersHandler(response) {
    console.log('received headers');
    console.log(response);
    const dataPromise = response.json();
    console.log('----------------------');
    dataPromise.then(dataHandler);
}

function dataHandler(data) {
    console.log('received data');
    console.log(data);
}

function errorHandler(err) {
    console.error(err.message);
}