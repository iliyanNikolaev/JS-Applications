const main = document.querySelector('main')

page('/', home);
page('/catalog', () => main.innerHTML = `
<h1>Catalog</h1>
<ul>
    <li><a href="/catalog/1">Product 1</a></li>
    <li><a href="/catalog/2">Product 2</a></li>
    <li><a href="/catalog/3">Product 3</a></li>
<ul>
`);
page('/catalog/:productId', middlewere, showCurrProduct);
page('/about', () => main.innerHTML = '<h1>About Us</h1>');
page('*', () => main.innerHTML = '<h1>404 Not Found</h1>');

page.start();

function home(){
    main.innerHTML = '<h1>Home Page</h1>';
}

function showCurrProduct(ctx){
    main.innerHTML = `
    <h2>Product no ${ctx.params.productId}</h2>
    <button>Back to catalog</button>
    `

    document.querySelector('button').addEventListener('click', () => {
        page.redirect('/catalog')
    });
}

function middlewere(ctx, next){
    console.log('middlewere');

    next();
}