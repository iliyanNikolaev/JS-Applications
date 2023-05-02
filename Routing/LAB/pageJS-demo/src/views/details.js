import {html} from 'https://unpkg.com/lit-html?module';
import { getParts } from '../data/data.js';

const detailsTemplate = (id) => html`
<h1>Details</h1>
<p>Product details: ${id}</p>
`;

export async function detailsPage(ctx){  
    const id = ctx.params.id;
    ctx.render(detailsTemplate(id));
}