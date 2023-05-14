import { html } from '../../node_modules/lit-html/lit-html.js'
import { editMovie, getById } from '../data/movies.js';
import { submitHandler } from '../util.js';

const editTemplate = (movie, onEdit) => html`
</div class="edit-page">
<h2>Edit</h2>
<form @submit=${onEdit}>
<div class="mb-3">
  <label for="title" class="form-label">Title</label>
  <input type="text" class="form-control" name="title" .value="${movie.title}">
</div>
<div class="mb-3">
  <label for="img" class="form-label">Poster URL</label>
  <input type="text" class="form-control" name="img" .value="${movie.img}">
</div>
<div class="mb-3">
  <label for="description" class="form-label">Description</label>
  <textarea class="form-control" name="description" .value=${movie.description} rows="3"></textarea>
</div>
<button type="submit" class="btn btn-primary">Edit</button>
</form>
</div>
`

export async function editPage(ctx) {
  const id = ctx.params.id;

  const currentMovie = await getById(id);
  ctx.render(editTemplate(currentMovie, submitHandler(onEdit)));


  async function onEdit({title, img, description}) {
    
    if(title == '' || img == '' || description == ''){
      return alert('All fields are required!');
    }

    await editMovie(id, data);
    ctx.page.redirect(`/details/${id}`);
  }
}