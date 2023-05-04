import { getAllItems, getMyItems } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const catalogTemplate = (items, myFurniturePage) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>${myFurniturePage ? html`My Furniture`: html`Welcome to Furniture System`}</h1>
                <p>${myFurniturePage ? html`This is a list of your publications.`: html`Select furniture from the catalog to view details.`}</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(itemTemplate)}
        </div>
`;

const itemTemplate = (item) => html`
<div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
`

export async function catalogPage(ctx) {
    const myFurniturePage = ctx.pathname == "/my-furniture";
    
    let items = [];

    if(myFurniturePage){
        const id = getUserData()._id;
        
        items = await getMyItems(id);
    } else {
        items = await getAllItems();
    }
    
    ctx.render(catalogTemplate(items, myFurniturePage));
}
