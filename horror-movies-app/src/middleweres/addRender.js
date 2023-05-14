import { render } from "../../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "../views/layout.js";

const root = document.body;

export function addRenderToContext(ctx, next){
    ctx.render = renderView.bind(null, ctx.userData);

    next();
}

function renderView(userData, content){
    render(layoutTemplate(userData, content), root);
}