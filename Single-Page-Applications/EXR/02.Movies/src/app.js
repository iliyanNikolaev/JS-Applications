import { viewHomePage } from "./home.js";
import { viewLoginPage } from "./login.js";
import { viewRegisterPage } from "./register.js";

hideAll();
viewHomePage();

document.getElementById('navigation').addEventListener('click', onNavigate);

function onNavigate(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();

        if(e.target.href){
            const url = new URL(e.target.href);

            const path = url.pathname;

            const renderer = routes[path];
            hideAll();
            renderer();
        }
    }
}

const routes = {
    '/home': viewHomePage,
    '/login': viewLoginPage,
    '/register': viewRegisterPage,
    '/logout': onLogout,
}

export function  hideAll(){
    const views = document.querySelectorAll('.view-section');

    views.forEach(v => v.style.display = 'none');
}

function onLogout(){
    sessionStorage.clear();
    viewHomePage();
    alert('successful logout')
}