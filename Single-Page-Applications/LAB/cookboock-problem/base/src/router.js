import { renderHome } from "./home.js";
import { renderCreate } from "./create.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderLogout } from "./logout.js";
const mainContainer = document.querySelector('.main-container')

const routes = {
    '/home': renderHome,
    '/create': renderCreate,
    '/register': renderRegister,
    '/login': renderLogin,
    '/logout': renderLogout
}

export function router(path){
    hideContent();

    const renderer = routes[path];

    renderer();
}

function hideContent(container){
    Array.from(mainContainer.children).forEach(x => x.style.display = 'none');
}