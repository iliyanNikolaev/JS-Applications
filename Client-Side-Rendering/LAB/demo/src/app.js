import { phones } from "./data.js";
import { movies } from "./data.js";
import { dom } from "./dom.js";
import { getTemplate } from "./templating.js";

start();

async function start() {
    const main = document.querySelector('main');
    const ul = document.querySelector('.movies-ul');
    const fragment = document.createDocumentFragment();
    for (const user of phones) {
        const article = dom('article', { className: 'user-block', dataset: {id: '123456', testid: '2227'}}, 
            dom('span', {style: { backgroundColor: 'red' }}, `Username: ${user.name}`),
            dom('span', {onClick: () => { alert(user.phone) }}, `Phone: ${user.phone}`)
        );

        fragment.appendChild(article);
    }

    main.appendChild(fragment);
    fragment.innerHTML = '';
    
    for (const movie of movies) {
        const article = dom('article', {className: 'movie'}, 
        dom('span', {}, `Movie: ${movie.title}`),
        dom('span', {}, `Category: ${movie.category}`)
        );

        fragment.appendChild(article);
    }

    ul.appendChild(fragment);
}


    /*
    for (const user of phones) {
        const html = await getTemplate('user-block', user);
        main.innerHTML += html;
    }

    for (const user of phones) {
        const article = document.createElement('article');
        article.className = 'user-block'
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `Username: ${user.name}`;
        article.appendChild(nameSpan);
        const phoneSpan = document.createElement('span');
        phoneSpan.textContent = `Phone: ${user.phone}`;
        article.appendChild(phoneSpan);

        main.appendChild(article);*/

