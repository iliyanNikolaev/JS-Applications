document.querySelector('nav').addEventListener('click', e => {
    if(e.target.tagName == 'A'){
        e.preventDefault();

        const url = new URL(e.target.href);
        const name = url.pathname;
        history.pushState({}, '', name);
        onNavigate();
    }
});

const views = {
    '/': '<h1>Home</h1>',
    '/catalog': '<h1>Catalog</h1>',
    '/about': '<h1>About</h1>',
};

onNavigate();

function showView(content){
    document.querySelector('main').innerHTML = content;
}

function onNavigate(){
    const path = location.pathname;
    const view = views[path];
    showView(view);
}
