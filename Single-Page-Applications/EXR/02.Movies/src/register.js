import { hideAll } from "./app.js";

const registerPage = document.getElementById('register-page');

export function viewRegisterPage() {
    hideAll();
    registerPage.style.display = 'block';
};