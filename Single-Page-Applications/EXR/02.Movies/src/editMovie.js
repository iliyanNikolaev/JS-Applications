import { viewHomePage } from "./home.js";
const detailsPage = document.getElementById('movie-example');
const editPage = document.getElementById('edit-movie');
const homePage = document.getElementById('home-page');

editPage.querySelector('form').addEventListener('submit', onEdit);

let id = undefined;

export function viewEditPage(e){
    e.preventDefault();
    id = e.target.getAttribute('data-idEdit');
    

    detailsPage.style.display = 'none';
    editPage.style.display = 'block';
}

async function onEdit(e){
    e.preventDefault();

    const userData = JSON.parse(sessionStorage.userData);
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    try {
        if(title === '' || description === '' || img === ''){
            throw new Error('All fields must be filled');
        }
        
        const body = {
            title,
            description,
            img
        }

        const response = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.accessToken
            },
            body: JSON.stringify(body)
        });

        e.target.reset();
        editPage.style.display = 'none';
        const querySelectorDetails = `[data-id="${id}"]`;
        homePage.querySelector(querySelectorDetails).click();


    } catch (err) {
        alert(err.message);
    }    
}

