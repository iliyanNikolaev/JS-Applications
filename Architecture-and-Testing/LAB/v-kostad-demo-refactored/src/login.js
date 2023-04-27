import { login } from "./data/auth.js";
import { addSubmitListener } from "./utill.js";

const loginSection = document.getElementById('login');
const loginForm = document.getElementById('login-form');
addSubmitListener(loginForm, onLogin)

let newCtx;

export function showLogin(ctx) {
    document.querySelector('main').replaceChildren(loginSection);

    newCtx = ctx;
}

async function onLogin(data) {
    await login(data.email, data.password)
    loginForm.reset();
    newCtx.showView('home-link');
}
