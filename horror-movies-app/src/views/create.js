import { html } from '../../node_modules/lit-html/lit-html.js'
import { createMovie } from '../data/movies.js';
import { submitHandler } from '../util.js'


const createTemplate = (onCreate) => html`
</div class="create-page">
<h2>Create movie</h2>
<form @submit=${onCreate}>
<div class="mb-3">
  <label for="title" class="form-label">Title</label>
  <input type="text" class="form-control" name="title">
</div>
<div class="mb-3">
  <label for="img" class="form-label">Poster URL</label>
  <input type="text" class="form-control" name="img">
</div>
<div class="mb-3">
  <label for="description" class="form-label">Description</label>
  <textarea class="form-control" name="description" rows="3"></textarea>
</div>
<button type="submit" class="btn btn-primary">Create</button>
</form>
</div>`

export async function createPage(ctx) {
  ctx.render(createTemplate(submitHandler(onCreate)));

  async function onCreate({ title, img, description }, form) {
    if (title == '' || img == '' || description == '') {
      return alert('All fields are required!');
    }
    
    await createMovie(data);
    form.reset();
    ctx.page.redirect('/');
  }
}