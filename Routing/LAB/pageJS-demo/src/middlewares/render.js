import {render} from 'https://unpkg.com/lit-html?module';
const main = document.querySelector('main')

export function addRender(ctx, next){
    ctx.render = renderView;

    next();
}

function renderView(content) {
    render(content, main);
}