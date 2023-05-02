import {html} from 'https://unpkg.com/lit-html?module';

const aboutTemplate = () => html`
<h1>About us</h1>
<p>Phone: +1-555-0227</p>`;

export function aboutPage(ctx){
    ctx.render(aboutTemplate());
}
