import { register } from "../api/users.js";

const section = document.querySelector('#registerPage');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

let ctx = null;

export function showRegister(context){
    ctx = context;
    context.showPage(section);
}

async function onRegister(e){
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await register(email, password);
    form.reset();
    ctx.goto('/');
    ctx.updateNav();
}