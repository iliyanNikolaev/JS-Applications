import page from './lib/page.mjs';
import { addRenderToCtx } from './middlewares/render.js';
import { addSessionToCtx } from './middlewares/session.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import * as users from './data/users.js';// for debug
import * as data from './data/data.js'; // for debug
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

page(addRenderToCtx(document.querySelector('main')));

page(addSessionToCtx(getUserData));

page('/', '/rooms');
page('/rooms', catalogPage);
page('/rooms/:id', ({params: { id }}) => console.log('details', id));
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage)

page.start();

window.users = users; // for debug
window.data = data; // for debug
