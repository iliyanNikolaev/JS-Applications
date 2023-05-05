import {html} from 'https://unpkg.com/lit-html?module';
import { getParts } from '../data/data.js';

const catalogTemplate = (list, isLoading) => html`
<h1>Catalog</h1>
${isLoading
? html`<p>Loading &hellip;</p>`
: html`
<ul>
    ${list.map(productTemplate)}
</ul>`}
`;

const productTemplate = (item) => html`<li><a href="/catalog/${item._id}">${item.label}</a></li>`;

export async function catalogPage(ctx){
    
    ctx.render(catalogTemplate([], true));
    
    const items = await getParts();
    
    ctx.render(catalogTemplate(items));
}
