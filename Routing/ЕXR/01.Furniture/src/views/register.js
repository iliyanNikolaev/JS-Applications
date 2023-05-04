import { register } from "../api/auth.js";
import { html } from "../lib.js";

const registerTemplate = (onRegister, errorMsg) => html`
<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onRegister}>
<div class="row space-top">
    <div class="col-md-4">
    <div class="row space-top invalid">${errorMsg ? html`${errorMsg}` : null}</div>
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control ${errorMsg ? 'is-invalid' : null}" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control ${errorMsg ? 'is-invalid' : null}" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control ${errorMsg ? 'is-invalid' : null}" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`

export function registerPage(ctx){
    update();

    function update(errorMsg) {
        ctx.render(registerTemplate(onRegister, errorMsg));
    }

    async function onRegister(e){
        e.preventDefault();

        const formData = new FormData(e.target);

        const {email, password, rePass} = Object.fromEntries(formData.entries());
        
        try {
            if(email == '' || password == ''){
                throw new Error('All fields are required!');
            }
    
            if(password != rePass){
                throw new Error('Passwords don\'t match!');
            }   

            await register(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (error) {
            update(error.message);
        }

    }
}