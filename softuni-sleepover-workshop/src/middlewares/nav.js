import { html, render } from "../lib/lit-html.js";

export const navTemplate = (hasUser) => html`
<nav>
<a href="/">Home</a>
<a href="/rooms">Rooms</a>
${hasUser 
? html`<a href="/create">Create Room</a> 
       <a href="/logout">Logout</a>`
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

    render(navTemplate(hasUser), document.querySelector('header'));

    next();
}