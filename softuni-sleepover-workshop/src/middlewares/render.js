import { render } from "../lib/lit-html.js";

export function addRenderToCtx(main){
    return function(ctx, next) {
        ctx.render = renderMain;

        next();
    };

    function renderMain(content){
        render(content, main)
    }
}

