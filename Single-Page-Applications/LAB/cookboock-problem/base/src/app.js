import {router} from './router.js';
const guestNav = document.querySelector('#guest');
guestNav.style.display = 'inline';

const userNav = document.querySelector('#user');
userNav.style.display = 'inline';

const navigation = document.querySelector('.navigation')

navigation.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.tagName === 'A'){
        const url = new URL(e.target.href);
        const path = url.pathname;

        router(path);
    }
});