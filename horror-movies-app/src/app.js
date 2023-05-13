import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/users.js";

// TODO change render root depending on project HTML structure

const root = document.body;

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);


page.start();

function decorateContext(ctx, next){
    ctx.render = renderView;
    next();
}

// TODO inject dependencies
function renderView(content){
    const userData = getUserData();

    render(layoutTemplate(userData, content), root);
}

async function onLogout(){
    await logout();
    page.redirect('/');
}