import {render} from 'https://unpkg.com/lit-html?module';
import { layoutTemplate } from '../views/layout.js';

const main = document.body;

export function addRenderToCtx(ctx, next){
    ctx.render = renderView.bind(null, ctx.user);

    next();
}

function renderView(user, content) {
    render(layoutTemplate(user, content), main);
}