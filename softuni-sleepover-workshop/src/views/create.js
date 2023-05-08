import { createRoom } from "../data/data.js";
import { html } from "../lib/lit-html.js";
import { submitHandler } from "../util.js";

const createTemplate = (onSubmit) => html`
<h2>Add Room</h2>
<form @submit=${onSubmit}>
<label>Name: <input type="text" name="name"></label>
<label>Beds: <input type="number" name="beds"></label>
<label>Location: <input type="text" name="location"></label>
<button>Add Room</button>
</form>
`

export function createPage(ctx) {
    ctx.render(createTemplate(submitHandler(onSubmit)));

    async function onSubmit({ name, beds, location }) {

        beds = parseInt(beds);
        
        if (name == "" || location == '' || Number.isNaN(beds)) {
            return alert('All fields are required!');
        }

        const id = ctx.user?.objectId;

        const result = await createRoom({ name, beds, location }, id);

        ctx.page.redirect('/rooms/' + result.objectId);
    }
}