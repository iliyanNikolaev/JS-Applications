import { page } from './lib/lib.js';

const root = document.querySelector('#root');

page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:productId', productPage);
page('/about', () => console.log('about page'));
page('*', () => root.innerHTML = '<h1>Not Found</h1>')

function homePage() {
    root.innerHTML = '<h1>Home page</h1>'
}

function catalogPage() {
    root.innerHTML = `<h1>Catalog</h1>
    <ul>
    <li><a href='/catalog/1'>Product 1</a></li>
    <li><a href='/catalog/2'>Product 2</a></li>
    <li><a href='/catalog/3'>Product 3</a></li>
    </ul>`
}

function productPage(ctx) {
    const productId = ctx.params.productId;
    root.innerHTML = `<h1>Product page</h1>
    <h2>Product ${productId}</h2>`;
}

page.start();