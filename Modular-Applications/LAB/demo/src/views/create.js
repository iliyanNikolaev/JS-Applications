import { html } from 'https://unpkg.com/lit-html?module';
import { createSubmitHandler } from '../utill.js';
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

    async function onSubmit({label, price, qty}, form) {
        
        price = Number(price);
        qty = Number(qty);

        try {
            if (label == '') {
                throw new Error('Please fill all fields!')
            }

            if (price <= 0 || Number.isNaN(price)) {
                throw new Error('Price must be a positive number!')
            }

            if (Number.isNaN(qty) || qty < 0 || Number.isInteger(qty) == false) {
                throw new Error('Stock number must be a non-negative integer!')
            }

            ctx.render(createTemplate(createSubmitHandler(onSubmit), true));
            await createPart({
                label,
                price,
                qty
            });
            form.reset();
            ctx.page.redirect('/catalog');
        } catch (error) {
            alert(error.message);
        }
    }
}