window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', loginHandler);
});

async function loginHandler(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
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
            username: dataFromServer.username,
            id: dataFromServer._id,
            token: dataFromServer.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';
    } catch (error) {
        alert(error.message);
    }
}