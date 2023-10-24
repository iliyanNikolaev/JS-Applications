const loginView = document.querySelector('#login-view');
const root = document.querySelector('#root');
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', onLogin);
let redirect;

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const { email, password } = Object.fromEntries(formData);
    
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }

    try {
        const res = await fetch('http://localhost:3030/users/login', options);
        if(!res.ok){
            const error = await res.json();
            throw error;
        }
        const userData = await res.json();
        
        localStorage.setItem('email', userData.email);
        localStorage.setItem('_id', userData._id);
        localStorage.setItem('accessToken', userData.accessToken);

        loginForm.reset();
        redirect('home');
    } catch (err) {
        alert(err.message);
    }

}

export function showLogin(showView) {
    root.replaceChildren(loginView);
    redirect = showView;
}