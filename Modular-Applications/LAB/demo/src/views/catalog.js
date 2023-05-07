import {html} from 'https://unpkg.com/lit-html?module';
import { getParts } from '../data/data.js';

const catalogTemplate = (list, isLoading, page, pages) => html`
<h1>Catalog</h1>
${isLoading
? html`<p>Loading &hellip;</p>`
: html`
${page - 1 > 0 ? html`<a href="/catalog?page=${page - 1}">&lt; Prev</a>`: null}
${page + 1 <= pages ? html`<a href="/catalog?page=${page + 1}">Next &gt;</a>`:null}
<ul>
    ${list.map(productTemplate)}
</ul>`}
`;

const productTemplate = (item) => html`<li><a href="/catalog/${item._id}">${item.label}</a></li>`;

export async function catalogPage(ctx){
    ctx.render(catalogTemplate([], true));
    
    const page = Number(ctx.query.page) || 1;

    const {result, pages} = await getParts(page);

    ctx.render(catalogTemplate(result, false, page, pages));
}
