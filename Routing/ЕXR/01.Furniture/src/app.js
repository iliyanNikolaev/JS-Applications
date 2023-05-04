import { render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import * as data from "./api/data.js";
import * as auth from "./api/auth.js"
import { getUserData } from "./util.js";

const root = document.querySelector('div.container');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);

page.start();
updateNav();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

async function onLogout(){
    auth.logout();

    page.redirect('/');
    updateNav();
}

function updateNav(){
    const userData = getUserData();

    if(userData){
        document.querySelectorAll('.guest').forEach(a => a.style.display = 'none');
        document.querySelectorAll('.user').forEach(a => a.style.display = 'inline');
    } else {
        document.querySelectorAll('.guest').forEach(a => a.style.display = 'inline');
        document.querySelectorAll('.user').forEach(a => a.style.display = 'none');
    }
}

window.data = data;