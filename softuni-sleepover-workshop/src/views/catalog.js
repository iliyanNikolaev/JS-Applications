import { html } from "../lib/lit-html.js";
import { getAllRooms } from "../data/data.js";

const catalogTemplate = (list) => html`
<h1>Available rooms</h1>
${list}
`

const listTemplate = (rooms) => html`
<section>
    ${rooms.map(r => roomCard(r))}
</section>
`

const roomCard = (room) => html`
<article>
<h3>${room.name}</h3>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
<p><a class="action" href="/rooms/${room.objectId}">View details</a></p>
</article>
`

export async function catalogPage(ctx){
    ctx.render(html`<p>Loading &hellip;</p>`);

    const response = await getAllRooms();
    const rooms = response.results;

    ctx.render(catalogTemplate(listTemplate(rooms)));
}