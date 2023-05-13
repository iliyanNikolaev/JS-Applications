import {html} from '../../node_modules/lit-html/lit-html.js'
import { getById } from '../data/movies.js';

const detailsTemplate = (movie) => html`<h2>Details</h2>
<div class="card details-card" style="width: 18rem;">
  <img src="${movie.img}" class="card-img-top" alt="movie-poster">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.description}</p>
  </div>
  <div class="card-body">
    <a href="/edit/${movie._id}" class="card-link">Edit</a>
    <a href="javascript:void(0)" class="card-link">Delete</a>
  </div>
</div>
`;

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const currentMovie = await getById(id);
    ctx.render(detailsTemplate(currentMovie));
}
