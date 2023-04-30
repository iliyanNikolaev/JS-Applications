import { html, render } from "../node_modules/lit-html/lit-html.js"
import { phones } from "./data.js";
import { movies } from "./data.js";
import { dom } from "./dom.js";
import { getTemplate } from "./templating.js";


const userBlock = (user) => html`
<article class="user-block">
<span style = "background-color:${user.color}">Username: ${user.name}</span>
<span>Phone: ${user.phone}</span>
</article>
`;

const movie = (movie) => html`
<article class="movie">
    <span>Movie: ${movie.title}</span>
    <span>Category: ${movie.category}</span>
    <button ?disabled=${movie.category != 'Horror'} @click=${() => watchMovie(movie)}>Watch</button>
</article>
`;

const greeting = (name) => html`<h2>Hello, ${name}!</h2>`; 

const main = document.querySelector('main');
const ul = document.querySelector('.movies-ul');
const h2 = document.querySelector('#greeting-message'); 
document.querySelector('#login').addEventListener('click', () => {
    render(greeting('Ilich'), h2);
})

start();

function start(){
    render(greeting('guest'), h2);
    render(phones.map(userBlock), main);
    render(movies.map(movie), ul)
}

function watchMovie(movie){
    const question = confirm(`Are you sure you want to watch ${movie.title}? The movie is scary!!`);
    if(question){
        alert(`You watched ${movie.title}! Sweet dreams!`)
    }
}



/*async function start() {
    const fragment = document.createDocumentFragment();
    for (const user of phones) {
        const article = dom('article', { className: 'user-block', dataset: { id: '123456', testid: '2227' } },
            dom('span', { style: { backgroundColor: 'red' } }, `Username: ${user.name}`),
            dom('span', { onClick: () => { alert(user.phone) } }, `Phone: ${user.phone}`)
        );

        fragment.appendChild(article);
    }

    main.appendChild(fragment);
    fragment.innerHTML = '';

    for (const movie of movies) {
        const article = dom('article', { className: 'movie' },
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

