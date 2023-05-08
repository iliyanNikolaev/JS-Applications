import { html } from "../lib/lit-html.js";
import { register } from "../data/users.js";
import { submitHandler } from "../util.js";

const registerTemplate = (onSubmit) => html`
<h2>Register</h2>
<form @submit=${onSubmit}>
<label>Email: <input type="text" name="email"></label>
<label>Username: <input type="text" name="username"></label>
<label>Password: <input type="password" name="password"></label>
<label>Repeat password: <input type="password" name="rePass"></label>
<button>Register</button>
</form>
`

export async function registerPage(ctx) {
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({ email, username, password, rePass }, form) {
        
        if(email == '' || username == '' || password == ''){
            return alert('All fields are required!');
        }

        if(password != rePass){
            return alert('Passwords don\'t match!')
        }
        
        await register(email, username, password);
        form.reset();
        ctx.page.redirect('/');
    }
}