import {html} from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/users.js';
import { submitHandler } from '../util.js'


const loginTemplate = (onSubmit) => html`
<h2>Login Page</h2>
<form @submit=${onSubmit}>
<label>Email: <input type="text" name="email"></label>
<label>Password: <input type="password" name="password"></label>
<button>Login</button>
</form>
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