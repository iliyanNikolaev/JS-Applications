import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showCatalog } from "./catalog.js";
const navigation = document.querySelector('nav');

Object.values(views).forEach(v => v.remove());
showHome();

navigation.addEventListener('click',onNavigate);

function onNavigate(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();
        const url = new URL(e.target.href);
        if(url.pathname == '/home'){
            showHome();
        } else if(url.pathname == '/login'){
            showLogin();
        } else {
            showCatalog();
        }
    }
}