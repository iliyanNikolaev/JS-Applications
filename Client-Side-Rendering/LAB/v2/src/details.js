import { html } from "./lib/lib.js";
import { getLaptopById } from "./api/data.js";

const detailsTemplate = (laptop) => html`
<section id="details-view">
<h2>Details</h2>
<p id="_id">${laptop._id}</p>
<p id="brand">${laptop.brand}</p>
<p id="gpu">${laptop.gpu}</p>
<p id="cpu">${laptop.cpu}</p>
</section>
`

export async function showDetails(ctx, id) {
    const details = await getLaptopById(id);
    ctx.render(detailsTemplate(details));
}