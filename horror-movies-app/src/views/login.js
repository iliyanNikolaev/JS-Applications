import {html} from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/users.js';
import { submitHandler } from '../util.js'


const loginTemplate = (onSubmit) => html`
<div class="login-page">
<h2>Login Page</h2>
<form @submit=${onSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name="email">
    <div id="emailHelp" class="form-text">We'll never share your email or password with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password">
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
</div>
`

export async function loginPage(ctx){
    ctx.render(loginTemplate(submitHandler(onLogin)));

    //TODO Change user object based on requirements
    async function onLogin({email, password}, form){
        await login(email, password);

        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}