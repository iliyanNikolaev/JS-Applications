import { showDetails } from './details.js'
import { getLaptops } from './api/data.js';
import { html } from './lib/lib.js';

const catalogTemplate = (laptops) => html`
<section id="catalog-view">
<h2>Laptops</h2>
<table>
    <thead>
        <tr>
            <th>_id</th>
            <th>brand</th>
            <th>gpu</th>
            <th>cpu</th>
            <th>controls</th>
        </tr>
    </thead>
    <tbody id="table">
    ${laptops.map(x => html`
    <tr>
    <td>${x._id}</td>
    <td>${x.brand}</td>
    <td>${x.gpu}</td>
    <td>${x.cpu}</td>
    <td>
        <button class="edit-btn" >Details</button>
    </td>
    </tr>`)}
    </tbody>
</table>
</section>
`;

export async function showCatalog(ctx) {
    const laptops = await getLaptops();
    ctx.render(catalogTemplate(laptops, ctx));
}
