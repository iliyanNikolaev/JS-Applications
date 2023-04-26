import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showCatalog } from "./catalog.js";
import { showDetails } from "./details.js";

const navigation = document.querySelector('nav');
const table = document.querySelector('table');
navigation.addEventListener('click',onNavigate);
table.addEventListener('click', onDetails);

function onNavigate(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();
        const url = new URL(e.target.href);
        if(url.pathname == '/home'){
            showHome();
        } else if(url.pathname == '/login'){
            showLogin();
        } else {
            showCatalog();
        }
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