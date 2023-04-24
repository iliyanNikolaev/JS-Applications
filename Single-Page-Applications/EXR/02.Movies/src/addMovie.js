import { viewHomePage } from "./home.js";

const addMoviePage = document.getElementById('add-movie');

export function viewAddPage(e){
    e.preventDefault();
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.style.display = 'none');

    addMoviePage.style.display = 'block';
}

addMoviePage.querySelector('.text-center.border.border-light.p-5').addEventListener('submit', onAddMovie);

async function onAddMovie(e){
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.userData);
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    const body = {
        title,
        description,
        img
    }

    if(title !== '' && description !== '' && img !== ''){

        try {
            const response = await fetch('http://localhost:3030/data/movies', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': `${userData.accessToken}`
                },
                body: JSON.stringify(body)
            });
            if(response.ok !== true){
                const error = await response.json();
                throw new Error(error.message);
            }

            addMoviePage.style.display = 'none';
            e.target.reset();
            viewHomePage();
        } catch (err) {
            alert(err.message);
        }
    }
}