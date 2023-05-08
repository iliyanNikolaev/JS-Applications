import { html } from "../lib/lit-html.js";
import { login } from "../data/users.js";
import { submitHandler } from "../util.js";

const loginTemplate = (onSubmit) => html`
<h2>Login</h2>
<form @submit=${onSubmit}>
<label>Username: <input type="text" name="username"></label>
<label>Password: <input type="password" name="password"></label>
<button>Login</button>
</form>
`

export async function loginPage(ctx) {
    ctx.render(loginTemplate(submitHandler(onLogin)));

    async function onLogin({ username, password }, form) {
        if(username == '' || password == ''){
            return alert('All fields are required!')
        }
        
        await login(username, password);
        form.reset();
        ctx.page.redirect('/');
    }
}