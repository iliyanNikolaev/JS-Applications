const homeView = document.querySelector('#home-view');
const root = document.querySelector('#root');
const congratsEl = document.querySelector('#congrats');

export function showHome() {
    const userEmail = localStorage.getItem('email');

    userEmail 
        ? congratsEl.textContent = `user logged in app => ${userEmail}`
        : congratsEl.textContent = 'user logged in app => guest'
    
    root.replaceChildren(homeView);
}
