import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { showLogin } from "./login.js";

const views = {
    home: showHome,
    catalog: showCatalog,
    login: showLogin
}

showHome();
document.querySelector('#navigation').addEventListener('click', router);

function router(e) {
    const targetEl = e.target;
    if(targetEl.tagName == 'A'){
        const page = targetEl.id;
        showView(page);
    }
}

function showView(page) {
    const renderFn = views[page];

        if(typeof renderFn == 'function'){
            renderFn(showView);
        }
}


