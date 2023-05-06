import { logout } from './data/auth.js';
import { addRenderToCtx } from './middlewares/render.js';
import { addSessionToCtx } from './middlewares/session.js';
import { aboutPage } from './views/about.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

page(addSessionToCtx);
page(addRenderToCtx);
page('index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:id', detailsPage);
page('/catalog/:id/edit', editPage);
page('/about', aboutPage);
page('/create', createPage)
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutFunc);

page.start();

function logoutFunc(){
    logout();
    page.redirect('/');
}
