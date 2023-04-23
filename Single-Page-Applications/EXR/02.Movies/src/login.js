import { hideAll } from "./app.js";

const loginPage = document.getElementById('login-page');

export function viewLoginPage(){
    hideAll();
    loginPage.style.display = 'block';
}