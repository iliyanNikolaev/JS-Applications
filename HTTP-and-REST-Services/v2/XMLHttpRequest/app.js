import { appKey, jsKey } from "../constants.js";

document.querySelector('button').addEventListener('click', loadLaptops);

function loadLaptops() {
    const url = 'https://parseapi.back4app.com/classes/Laptops';
    const req = new XMLHttpRequest();

    req.addEventListener('readystatechange', () => {
        if(req.readyState == 4 && req.status == 200) {
            document.querySelector('#response').textContent = req.responseText;
        }
    });

    req.open('GET', url);
    req.setRequestHeader('X-Parse-Application-Id', appKey);
    req.setRequestHeader('X-Parse-Javascript-Key', jsKey);
    req.send();
}