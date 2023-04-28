import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showDetails } from "./views/details.js";

const main = document.querySelector('main');
document.querySelector('#views').remove();
document.addEventListener('click', onNavigate);

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/details': showDetails,
    '/create': showCreate,
    '/register': showRegister
}

function showPage(section) {
    main.replaceChildren(section);
}

const context = {
    showPage,
    goto
}

//Start app in home view
goto('/');

function onNavigate(event) {
    let clickedTarget = event.target; //Този иф се налага понеже в единия <а> таг е сложена картинка 
    if (clickedTarget.tagName == 'IMG') {
        clickedTarget = event.target.parentElement;
    }

    if (clickedTarget.tagName == 'A') {
        event.preventDefault();
        const url = new URL(clickedTarget.href)
        goto(url.pathname);
    }
}

function goto(link) {
    const viewer = links[link];

    if (typeof viewer == 'function') {
        viewer(context);
    }
}


