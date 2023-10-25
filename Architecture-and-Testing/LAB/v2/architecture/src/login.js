import { login } from "./api/auth.js";

const loginView = document.querySelector('#login-view');
const root = document.querySelector('#root');
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', onLogin);
let redirect;

export function showLogin(showView) {
    root.replaceChildren(loginView);
    redirect = showView;
}

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const { email, password } = Object.fromEntries(formData);
    
    try {
        await login(email, password);
        loginForm.reset();
        redirect('home');
    } catch (err) {
        alert(err.message);
    }
}
