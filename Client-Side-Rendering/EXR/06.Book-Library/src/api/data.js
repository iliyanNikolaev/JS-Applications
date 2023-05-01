import * as api from "./api.js";

const booksURL = '/jsonstore/collections/books';

export async function getBooks() {
    const books = await api.get(booksURL);

    return books;
}

export async function createBook(author, title) {
    const book = await api.post(booksURL, { author, title });

    return book;
}

export async function editBook(id, author, title) {
    const book = await api.put(booksURL + '/' + id, { author, title });

    return book;
}

export async function deleteBook(id) {
    const book = await api.del(booksURL + '/' + id);

    return book;
}

