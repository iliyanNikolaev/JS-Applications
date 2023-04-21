window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-form').addEventListener('submit', registerHandler);
});

async function registerHandler(e) {
    e.preventDefault();
    const pattern = /[a-zA-z]+@[a-zA-z]+\.[a-zA-Z]+/gm;
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    const body = {
        email,
        password
    }
    try {
        if (!pattern.test(email) || password !== rePass || password === '') {
            throw new Error('Invalid data!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if(response.ok !== true){
            throw new Error(response.message);
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
    } catch (err) {
        alert(err.message);
    }
}