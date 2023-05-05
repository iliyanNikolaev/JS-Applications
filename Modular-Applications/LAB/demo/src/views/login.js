import {html} from 'https://unpkg.com/lit-html?module';
import { createSubmitHandler } from '../utill.js';
import { login } from '../data/auth.js';

const loginTemplate = (onSubmit) => html`
<h1>Sign In</h1>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Sign In</button>
</form>
<p>Don't have an account? <a href="/register">Sign up now!</a></p>`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }){
        await login(email, password);
        ctx.page.redirect('/');
    }
}