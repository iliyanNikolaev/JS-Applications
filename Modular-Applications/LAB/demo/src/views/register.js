import {html} from 'https://unpkg.com/lit-html?module';
import { createSubmitHandler } from '../utill.js';
import { register } from '../data/auth.js';

const registerTemplate = (onSubmit) => html`
<h1>Register</h1>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat password: <input type="password" name="repass"></label>
    <button>Register</button>
</form>
<p>Already have an account? <a href="/login">Sign in now!</a></p>`;

export function registerPage(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, repass }){
        if(email == '' || password == ''){
            return alert('All fields are required!')
        }
        if(password != repass){
            return alert('Passwords don\'t match!')
        }

        await register(email, password);
        ctx.page.redirect('/');
    }
}