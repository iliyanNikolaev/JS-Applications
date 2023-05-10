import {html} from '../../node_modules/lit-html/lit-html.js'
import { register } from '../data/users.js';
import { submitHandler } from '../util.js'


const registerTemplate = (onSubmit) => html`
<h2>Register Page</h2>
<form @submit=${onSubmit}>
<label>Email: <input type="text" name="email"></label>
<label>Password: <input type="password" name="password"></label>
<label>Repeat password: <input type="password" name="repass"></label>
<button>Register</button>
</form>
`

export async function registerPage(ctx){
    ctx.render(registerTemplate(submitHandler(onRegister)));

    //TODO Change user object based on requirements
    async function onRegister({email, password, repass}, form){
        if(email == '' || password == '' || repass == ''){
            return alert('All fields are required!');
        }

        if(password != repass){
            return alert('Passwords don\'t match!');
        }

        await register(email, password);

        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}