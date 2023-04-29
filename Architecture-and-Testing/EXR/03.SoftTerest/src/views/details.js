import { getById, deleteById } from "../api/data.js";

const section = document.querySelector('#detailsPage');

let ctx = null;

export async function showDetails(context, id) {
    context.showPage(section);
    
    ctx = context;

    const ideaDetails = await getById(id);
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == ideaDetails._ownerId;

    section.innerHTML = createDetailsHTML(ideaDetails, isOwner);

    if(isOwner){
        document.querySelector('#delete-btn').addEventListener('click', async (e) => {
            e.preventDefault();
            const choice = confirm('Are you sure you want to delete this idea?');

            if(choice){
                await deleteById(ideaDetails._id);
                ctx.goto('/catalog');
            }
        });
    }
}

function createDetailsHTML(idea, isOwner) {
    const user = JSON.parse(localStorage.getItem('user'));
    let html = `
                <img class="det-img" src="${idea.img}" />
                <div class="desc">
                    <h2 class="display-5">${idea.title}</h2>
                    <p class="infoType">Description:</p>
                    <p class="idea-description">${idea.description}</p>
                </div>`;
    if (isOwner) {
        html += `<div class="text-center">
                    <a id="delete-btn" class="btn detb" href="">Delete</a>
                </div>`;
    }

    return html;
}