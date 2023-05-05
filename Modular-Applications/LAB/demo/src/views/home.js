import {html} from 'https://unpkg.com/lit-html?module';

const homeTemplate = () => html`
<h1>Home page</h1>
<p>Welcome to our site</p>`;

export function homePage(ctx){
    ctx.render(homeTemplate());
}


