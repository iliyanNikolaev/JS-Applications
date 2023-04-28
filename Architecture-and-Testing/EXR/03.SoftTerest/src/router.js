export function initialize(links){
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    nav.addEventListener('click', onNavigate);
    
    const context = {
        showPage,
        goto,
        updateNav
    }

    return context;

    function showPage(section) {
        main.replaceChildren(section);
    }
    
    function onNavigate(event) {
        let clickedTarget = event.target; //Този иф се налага понеже в единия <а> таг е сложена картинка 
        if (clickedTarget.tagName == 'IMG') {
            clickedTarget = event.target.parentElement;
        }
    
        if (clickedTarget.tagName == 'A') {
            event.preventDefault();
            const url = new URL(clickedTarget.href)
            goto(url.pathname);
        }
    }
    
    function goto(link) {
        const viewer = links[link];
    
        if (typeof viewer == 'function') {
            viewer(context);
        }
    }

    function updateNav(){
        const user = localStorage.getItem('user');

        if(user) {
            nav.querySelectorAll('.user').forEach(el => el.style.display = 'block');
            nav.querySelectorAll('.guest').forEach(el => el.style.display = 'none');
        } else {
            nav.querySelectorAll('.user').forEach(el => el.style.display = 'none');
            nav.querySelectorAll('.guest').forEach(el => el.style.display = 'block');
        }
    }
}