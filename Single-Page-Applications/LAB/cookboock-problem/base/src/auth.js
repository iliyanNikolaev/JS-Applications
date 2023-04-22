const guestNav = document.querySelector('#guest');
guestNav.style.display = 'inline';

const userNav = document.querySelector('#user');


export function authNav(){
    if(sessionStorage.userData !== undefined){
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }
}