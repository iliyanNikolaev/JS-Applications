import { getUserData } from "./api/request.js";

const homeView = document.querySelector('#home-view');
const root = document.querySelector('#root');
const congratsEl = document.querySelector('#congrats');

export function showHome() {
    const userData = getUserData();

    userData 
        ? congratsEl.textContent = `user logged in app => ${userData.email}`
        : congratsEl.textContent = 'user logged in app => guest'
    
    root.replaceChildren(homeView);
}
