import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAllMovies } from '../data/movies.js';

const homeTemplate = (movies) => html`
<h2>Movies</h2>
<div class="movie-list">
${movies.map(x => movieCard(x))}
</div>
`

const movieCard = (movie) => html`
<div class="card movie-card" style="width: 18rem;">
  <img src="${movie.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <a href="/details/${movie._id}" class="btn btn-primary">Details</a>
  </div>
</div>`

// TODO Replace with actual view
export async function homePage(ctx){
    const movies = await getAllMovies();
    ctx.render(homeTemplate(movies));
}