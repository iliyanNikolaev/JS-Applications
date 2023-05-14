import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteMovie, getById } from '../data/movies.js';

const detailsTemplate = (movie, isOwner, onDelete) => html`<h2>Details</h2>
<div class="card details-card" style="width: 18rem;">
  <img src="${movie.img}" class="card-img-top" alt="movie-poster">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">${movie.description}</p>
  </div>
  <div class="card-body">
    ${isOwner ? html`
    <a href="/edit/${movie._id}" class="card-link">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete} class="card-link">Delete</a>
    ` : null}
  </div>
</div>`;

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const currentMovie = await getById(id);
    let isOwner = false;

    const userData = ctx.userData;

    if(userData){
      if(userData._id == currentMovie._ownerId){
        isOwner = true;
      }
    }

    ctx.render(detailsTemplate(currentMovie, isOwner, onDelete));

    async function onDelete(){
      const choice = confirm(`Are you sure you want to delete ${currentMovie.title}?`);
      if(choice){
        await deleteMovie(id);
        ctx.page.redirect('/');
      }
    }
}
