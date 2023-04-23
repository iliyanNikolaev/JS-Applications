import { viewHomePage } from "./home.js";

const registerPage = document.getElementById('register-page');
const form = registerPage.querySelector('.text-center.border.border-light.p-5');

export function viewRegisterPage() {

    registerPage.style.display = 'block';
};

form.addEventListener('submit', onRegister);

async function onRegister(e){
    e.preventDefault();

    const emailPattern = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/gm;
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if(emailPattern.test(email) && password.length >= 6 && password === rePass){
        const body = {
            email,
            password
        }

        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(response.ok !== true){
                const error = await response.json();

                throw new Error(error.message)
            }

            const data = await response.json();

            sessionStorage.setItem('userData', JSON.stringify(data));
            
            registerPage.style.display = 'none';
            viewHomePage();
        } catch (err) {
            alert(err.message);
        }
    }    
}