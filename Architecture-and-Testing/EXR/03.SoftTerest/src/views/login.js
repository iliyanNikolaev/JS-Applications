import { login } from "../api/users.js";

const section = document.querySelector('#loginPage');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);

let ctx = null;

export function showLogin(context){
    ctx = context;
    context.showPage(section);
}

async function onLogin(e){
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goto('/');
}