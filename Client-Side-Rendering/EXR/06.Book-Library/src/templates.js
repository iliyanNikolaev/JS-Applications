import {html} from 'https://unpkg.com/lit-html?module';

export const loadBtnTemplate = () => html`<button id="loadBooks">LOAD ALL BOOKS</button>`;

export const tableTemplate = () => html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
`;

export const tableRowTemplate = (id ,book) => html`
<tr>
<td>${book.title}</td>
<td>${book.author}</td>
<td>
    <button id="${id}">Edit</button>
    <button id="${id}">Delete</button>
</td>
</tr>
`;

export const formTemplate = (id) => html`
<form id="${id}">
<h3>${id == 'add-form' ? 'Add book' : 'Edit book'}</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Submit">
</form>
`