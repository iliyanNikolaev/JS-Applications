import page from "../node_modules/page/page.mjs";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/users.js";
import * as movies from "./data/movies.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { addUserToCtx } from "./middleweres/addUserData.js";
import { addRenderToContext } from "./middleweres/addRender.js";
import { createPage } from "./views/create.js";

page(addUserToCtx);
page(addRenderToContext);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage)
page('/details/:id', detailsPage);
page('/edit/:id', editPage)

page.start();

async function onLogout(){
    await logout();
    page.redirect('/');
}


window.movies = movies;