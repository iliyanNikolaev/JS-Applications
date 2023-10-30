import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { showLogin } from "./login.js";
import { render } from "./lib/lib.js";

const root = document.querySelector('#root');

const views = {
    home: showHome,
    catalog: showCatalog,
    login: showLogin
}


document.querySelector('#navigation').addEventListener('click', router);

const ctx = {
    showView,
    render: renderViewTemplate
}

showHome(ctx);

function router(e) {
    const targetEl = e.target;
    if (targetEl.tagName == 'A') {
        const page = targetEl.id;
        showView(page);
    }
}

function showView(page) {
    const renderFn = views[page];

    if (typeof renderFn == 'function') {
        renderFn(ctx);
    }
}

function renderViewTemplate(template) {
    render(template, root);
}

