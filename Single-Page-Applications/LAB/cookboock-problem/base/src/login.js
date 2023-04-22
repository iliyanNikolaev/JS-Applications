import { authNav } from "./auth.js";

const loginPage = document.querySelector('.login');
const form = loginPage.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        const dataFromServer = await response.json();
        const userData = {
            email: dataFromServer.email,
            token: dataFromServer.accessToken
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        authNav();
        alert('successful login');
    } catch (err) {
        alert(err.message);
    }

});

export function renderLogin() {
    loginPage.style.display = 'block';

}