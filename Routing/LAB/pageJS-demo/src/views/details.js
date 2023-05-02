import {html} from 'https://unpkg.com/lit-html?module';
import { deletePart, getDetails } from '../data/data.js';
import { getUserData } from '../utill.js';

const detailsTemplate = (details, onDelete) => html`
<h1>Details</h1>
<p>S/N: ${details._id}</p>
<p>Part Label: ${details.label}</p>
<p>In stock: ${details.qty}</p>
<p>Unit price: ${details.price}.00 BGN</p>
${details.canEdit 
    ? html`
        <a href="/catalog/${details._id}/edit">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}>Delete</a>`
    : null}
`;

export async function detailsPage(ctx){  
    const id = ctx.params.id;
    const details = await getDetails(id);
    
    const userData = getUserData();
    if(userData){
        details.canEdit = details._ownerId == userData._id;
    }

    ctx.render(detailsTemplate(details, onDelete));

    async function onDelete(){
        const choice = confirm(`Are you sure you want to delete part: ${details.label}`);

        if(choice){
            await deletePart(id);
            ctx.page.redirect('/catalog');
        }
    }
}