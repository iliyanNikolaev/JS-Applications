import page from './lib/page.mjs';
import { addRenderToCtx } from './middlewares/render.js';
import { addSessionToCtx } from './middlewares/session.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';

page(addRenderToCtx(document.querySelector('main')));

page(addSessionToCtx(getUserData));

page('/', '/create');
page('/rooms', () => console.log('catalog'));
page('/rooms/:id', ({params: { id }}) => console.log('details', id));
page('/create', createPage);

page.start();