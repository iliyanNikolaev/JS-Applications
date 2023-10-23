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
        const renderFn = views[targetEl.id];

        if(typeof renderFn == 'function'){
            renderFn();
        }
    }
}


