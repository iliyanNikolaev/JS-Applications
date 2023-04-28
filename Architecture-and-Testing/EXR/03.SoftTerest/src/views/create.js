import { createIdea } from "../api/data.js";

const section = document.querySelector('#createPage');
const form = section.querySelector('form');

form.addEventListener('submit', onCreate);

let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showPage(section);
}

async function onCreate(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    await createIdea({ title, description, img });
    form.reset();
    ctx.goto('/catalog');
}