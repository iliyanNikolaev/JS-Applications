import { html, render } from "../lib/lit-html.js";
import { clearUserData } from "../util.js";


export const navTemplate = (hasUser, onLogout) => html`
<nav>
<a href="/">Home</a>
<a href="/rooms">Rooms</a>
${hasUser 
? html`<a href="/create">Create Room</a> 
       <a href="javascript:void(0)" @click=${onLogout}>Logout</a>`
: html`<a href="/login">Login</a>
       <a href="register">Register</a>`
}
</nav>
`

export function renderNav(ctx, next){
    let hasUser = false;
    if(ctx.user != undefined){
        hasUser = true;
    }
    render(navTemplate(hasUser, onLogout), document.querySelector('header'));
    next();

    function onLogout(){
        clearUserData();
        ctx.page.redirect('/');
    }
}

