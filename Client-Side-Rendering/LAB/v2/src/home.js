import { getUserData } from "./api/request.js";
import { html } from "./lib/lib.js";

const homeTemplate = (userData) => html`
<section id="home-view">
    <h2>Home page</h2>
    <p>Welcome, this app is for education purposes</p>
    <p>user logged in app => ${userData ? userData.email : 'guest'}</p>
</section>
`;

export function showHome(ctx) {
    const userData = getUserData();

    ctx.render(homeTemplate(userData));
}
