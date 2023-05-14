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

const registerTemp = (onRegister) => html`
<div class="register-page">
<h2>Register Page</h2>
<form @submit=${onRegister}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name="email">
    <div id="emailHelp" class="form-text">Please fill correctly all fields.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password">
  </div>
  <div class="mb-3">
    <label for="rePass" class="form-label">Repeat Password</label>
    <input type="password" class="form-control" name="repass">
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
</div>
`

export async function registerPage(ctx){
    ctx.render(registerTemp(submitHandler(onRegister)));

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