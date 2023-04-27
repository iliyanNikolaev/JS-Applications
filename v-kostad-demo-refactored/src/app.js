import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showCatalog } from "./catalog.js";
import { showDetails } from "./details.js";

const navigation = document.querySelector('nav');
const table = document.querySelector('table');
navigation.addEventListener('click', onNavigate);
table.addEventListener('click', onDetails);

const views = {
    'home-link': showHome,
    'catalog-link': showCatalog,
    'login-link': showLogin
}

function onNavigate(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();
        const id = e.target.id;

        showView(id);
    }
}

const ctx = {
    showView
}

function showView(name){
    const view = views[name];
    if(typeof view == 'function'){
        view(ctx);
    }
}

function onDetails(e){
    if(e.target.tagName == 'A'){
        const id = e.target.dataset.id;
        showDetails(id);
    }
}

document.getElementById('views').remove();
showHome();