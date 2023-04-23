const homePage = document.getElementById('home-page');
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');

viewHomePage();

document.getElementById('navigation').addEventListener('click', onNavigate);

function onNavigate(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();

        if(e.target.href){
            const url = new URL(e.target.href);

            const path = url.pathname;

            const renderer = routes[path];

            renderer();
        }
    }
}

const routes = {
    '/home': viewHomePage,
    '/login': viewLoginPage,
    '/register': viewRegisterPage,
    '/logout': onLogout,
}

function  hideAll(){
    const views = document.querySelectorAll('.view-section');

    views.forEach(v => v.style.display = 'none');
}

function viewHomePage(){
    hideAll();
    homePage.style.display = 'block';
}

function viewLoginPage(){
    hideAll();
    loginPage.style.display = 'block';
}

function viewRegisterPage(){
    hideAll();
    registerPage.style.display = 'block';
}

function onLogout(){
    viewHomePage();
    alert('successful logout')
}