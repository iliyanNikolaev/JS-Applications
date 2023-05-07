import { html } from 'https://unpkg.com/lit-html?module';
import { createSubmitHandler, validatePartData } from '../utill.js';
import { createPart } from '../data/data.js';

const createTemplate = (onSubmit, isLoading) => html`
<h1>Create part</h1>
<form @submit=${onSubmit}>
<label>Label: <input type="text" name="label"></label>
<label>Price: <input type="number" name="price"></label>
<label>In Stock: <input type="number" name="qty"></label>
${isLoading?html`<p>Loading &hellip;</p>`: html`<button>Publish</button>`}
</form>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit(data, form) {
        try {
            const validatedData = validatePartData(data);

            ctx.render(createTemplate(createSubmitHandler(onSubmit), true));
            await createPart(validatedData);
            form.reset();
            ctx.page.redirect('/catalog');
        } catch (error) {
            alert(error.message);
        }
    }
}