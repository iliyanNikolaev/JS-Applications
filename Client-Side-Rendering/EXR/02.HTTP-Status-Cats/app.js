import {html, render} from 'https://unpkg.com/lit-html?module';
import { cats } from './catSeeder.js';

const catCardTemplate = (cat) => html`
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn" @click = ${() => onShow(cat.id)}>Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`;

const root = document.querySelector('#allCats');
const ul = document.createElement('ul');

render(cats.map(catCardTemplate), ul);
root.appendChild(ul);


function onShow(id){
    const detailsElement = document.getElementById(id);
    const liElement = detailsElement.parentElement;
    const btn = liElement.querySelector('button');
    if(detailsElement.style.display == 'none'){
        detailsElement.style.display = 'block';
        btn.textContent = 'Hide status code';
    } else {
        detailsElement.style.display = 'none';
        btn.textContent = 'Show status code';
    }
}
