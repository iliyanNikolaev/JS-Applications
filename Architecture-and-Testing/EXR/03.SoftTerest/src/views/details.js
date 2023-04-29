import { getById } from "../api/data.js";

const section = document.querySelector('#detailsPage');

export async function showDetails(context, id){
    context.showPage(section);

    const ideaDetails = await getById(id);

    section.innerHTML = createDetailsHTML(ideaDetails);
}

function createDetailsHTML(idea){
    return `
    <img class="det-img" src="${idea.img}" />
            <div class="desc">
                <h2 class="display-5">${idea.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${idea.description}</p>
            </div>
            <div class="text-center">
                <a class="btn detb" href="">Delete</a>
            </div>`
}