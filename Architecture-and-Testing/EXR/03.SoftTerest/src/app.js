import { showHome } from "./views/home.js";

const main = document.querySelector('main');
const registerPage = document.querySelector('#registerPage');
const loginPage = document.querySelector('#loginPage');
const detailsPage = document.querySelector('#detailsPage');
const catalogPage = document.querySelector('#dashboard-holder');
const createPage = document.querySelector('#createPage');
const views = document.querySelector('#views');

views.remove();

const links = {
    '/': showHome,
    '/catalog': catalogPage,
    '/login': loginPage,
    '/details': detailsPage,
    '/create': createPage,
    '/register': registerPage
}

function showPage(section){
    main.replaceChildren(section);
}

const context = {
    showPage
}

window.showHome = () => {
    showHome(context);
}

