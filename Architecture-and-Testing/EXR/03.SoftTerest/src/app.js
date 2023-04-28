import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

const main = document.querySelector('main');
document.querySelector('#views').remove();
document.addEventListener('click', onNavigate);

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/details': detailsPage,
    '/create': showCreate,
    '/register': showRegister
}

function showPage(section){
    main.replaceChildren(section);
}

const context = {
    showPage
}

function onNavigate(event){
    
}


