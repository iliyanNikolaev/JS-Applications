export function initialize(links){
    const main = document.querySelector('main');
    document.addEventListener('click', onNavigate);
    
    const context = {
        showPage,
        goto
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
}