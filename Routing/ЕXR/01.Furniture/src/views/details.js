import { html } from "../lib.js";

const detailsTemplate = () => html``;

export function detailsPage(ctx){
    const id = ctx.params.id;
    console.log(`details view ${id}`);
}