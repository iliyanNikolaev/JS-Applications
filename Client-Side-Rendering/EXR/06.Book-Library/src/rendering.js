import * as data  from "./api/data.js";

import {loadBtnTemplate, tableTemplate, tableRowTemplate, formTemplate} from "./templates.js";

import {render} from 'https://unpkg.com/lit-html?module';

const loadBtnContainer = document.querySelector('#load-btn');
const tableContainer = document.querySelector('#table');
const formContainer = document.querySelector('#form-container');

let books = {};
let booksEntries = [];

export async function renderHomePage(formId){
    render(loadBtnTemplate(), loadBtnContainer);
    render(tableTemplate(), tableContainer);

    books = await data.getBooks();
    booksEntries = Object.entries(books);

    render(booksEntries.map( kvp => tableRowTemplate(kvp[0], { title: kvp[1].title, author: kvp[1].author}) ), document.querySelector('tbody'));
    render(formTemplate(formId), formContainer);
}

