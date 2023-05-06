import { html } from 'https://unpkg.com/lit-html?module';
import { editPart, getDetails } from '../data/data.js';
import { createSubmitHandler, validatePartData } from '../utill.js';

const editTemplate = (partData, onSubmit, isLoading) => html`
<h1>Edit part</h1>
<form @submit=${onSubmit}>
<label>Label: <input type="text" name="label" value="${partData.label}"></label>
<label>Price: <input type="number" name="price" value="${partData.price}"></label>
<label>In Stock: <input type="number" name="qty" value="${partData.qty}"></label>
${isLoading?html`<p>Loading &hellip;</p>`: html`<button>Save Changes</button>`}
</form>
`

export async function editPage(ctx){
    const id = ctx.params.id;
    
    try {
        const partData = await getDetails(id);   
        ctx.render(editTemplate(partData, createSubmitHandler(onSubmit)));   
    
    } catch (err) {
        alert(err.message);
    }
    
    async function onSubmit(data, form){
        try {
            const editedData = data;
            const validatedData = validatePartData(editedData);
            ctx.render(editTemplate(editedData, createSubmitHandler(onSubmit), true));
            await editPart(id, validatedData);
            form.reset();
            ctx.page.redirect('/catalog');
        } catch (err) {
            alert(err.message);
        }
    }
}