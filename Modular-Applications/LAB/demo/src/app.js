import { addRender } from './middlewares/render.js';
import { getUserData } from './utill.js';
import { aboutPage } from './views/about.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

page(contextDecorator);
page('*', addRender);
page('index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:id', detailsPage);
page('/catalog/:id/edit', () => console.log('TODO...'));
page('/about', aboutPage);
page('/login', loginPage);
page('/register', registerPage);

page.start();
updateNav();

function updateNav(){
    const userData = getUserData();

    if(userData != null){
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
    } else {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline');
    }
}

function contextDecorator(ctx, next){
    ctx.updateNav = updateNav; 
    next();
}
