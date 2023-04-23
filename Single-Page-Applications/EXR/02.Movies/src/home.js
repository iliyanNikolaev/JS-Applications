import { hideAll } from "./app.js";

const homePage = document.getElementById('home-page');

export function viewHomePage(){
    hideAll();
    homePage.style.display = 'block';
}