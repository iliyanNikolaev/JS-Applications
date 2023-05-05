import {html} from 'https://unpkg.com/lit-html?module';
import { createSubmitHandler } from '../utill.js';
import { createPart } from '../data/data.js';

const createTemplate = (onSubmit) => html`
<h1>Create part</h1>
<form @submit=${onSubmit}>
<label>Label: <input type="text" name="label"></label>
<label>Price: <input type="number" name="price"></label>
<label>In Stock: <input type="number" name="qty"></label>
<button>Publish</button>
</form>
`;

export function createPage(ctx){
    ctx.render(createTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit(data, form){
        try {
            for (const entry in data) {
                if(data[entry] == ''){
                    throw new Error('Please fill all fields!')
                }

                if(entry != 'label'){
                    data[entry] = Number(data[entry]);
                }
            }

            console.log(data)
            await createPart(data);
            form.reset();
            ctx.page.redirect('/catalog'); 
        } catch (error) {
            alert(error.message);
        } 
    }
}