import { login } from "./api/auth.js";
import { html } from "./lib/lib.js";

let redirect;
const loginTemplate = () => html`
<section id="login-view">
<h2>Login</h2>
<form id="login-form" @submit=${onLogin}}>
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <input type="submit" value="login">
</form>
</section>
`

export function showLogin(ctx) {
    ctx.render(loginTemplate());
    redirect = ctx.showView;
}

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const { email, password } = Object.fromEntries(formData);
    
    try {
        await login(email, password);
        loginForm.reset();
        redirect('home');
    } catch (err) {
        alert(err.message);
    }
}
