import {html} from '../../node_modules/lit-html/lit-html.js'

const homeTemplate = () => html`
<h2>Home Page</h2>
<p>Welcome to our site</p>
`

// TODO Replace with actual view
export function homePage(ctx){
    ctx.render(homeTemplate());
}