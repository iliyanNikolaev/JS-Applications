import { deleteItem, getItemById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (details, isOwner, onDelete) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${details.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${details.make}</span></p>
                <p>Model: <span>${details.model}</span></p>
                <p>Year: <span>${details.year}</span></p>
                <p>Description: <span>${details.description}</span></p>
                <p>Price: <span>${details.price}</span></p>
                <p>Material: <span>${details.material || ''}</span></p>
                <div>
                    ${isOwner
                        ? html`<a href="/edit/${details._id}" class="btn btn-info">Edit</a>
                                <a href="javascript:void(0)" class="btn btn-red" @click=${onDelete}>Delete</a>`
                        : null}
                </div>
            </div>
        </div>
`;

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const details = await getItemById(id);

    let isOwner = false;
    
    const userData = getUserData();
    if(userData){
        isOwner = userData._id == details._ownerId;
    }

    ctx.render(detailsTemplate(details, isOwner, onDelete));

    async function onDelete(){
        await deleteItem(id);
        ctx.page.redirect('/');
    }    
}
