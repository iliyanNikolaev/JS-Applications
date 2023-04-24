const detailsPage = document.getElementById('movie-example');
const homePage = document.getElementById('home-page');
let userData = '';

export async function viewDetailsPage(e){
    if(e.target.tagName === 'BUTTON'){
        if(sessionStorage.userData){
            userData = JSON.parse(sessionStorage.userData);
        }

        const _id = e.target.getAttribute('data-id');
        const movieData = await getMovieDetails(_id);
        const content = createMovieCard(movieData, userData);

        homePage.style.display = 'none';
        detailsPage.innerHTML = '';
        detailsPage.appendChild(content);

        detailsPage.style.display = 'block';
    }
}

async function getMovieDetails(id){
    try {
        const response = await fetch (`http://localhost:3030/data/movies/${id}`);
        
        if(response.ok !== true){
            throw new Error('Bad request! Try again later!');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        alert(err.message);
    }
}

function createMovieCard(movieData, userData){
    const div = document.createElement('div');
    div.className = 'container';

    div.innerHTML = `
        <div class="container">
        <div class="row bg-light text-dark">
        <h1>Movie title: ${movieData.title}</h1>

        <div class="col-md-8">
        <img class="img-thumbnail" src="${movieData.img}"
        alt="Movie">
        </div>
        <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movieData.description}</p>
        ${createBtns(movieData, userData)}
        </div>
        </div>
        </div>
    `
//       <span class="enrolled-span">Liked 1</span>
    return div;
}

function createBtns(movieData, userData){
    let result = '';
    if(userData === ''){
        return '';
    } else if(userData._id === movieData._ownerId){
        result = `<a class="btn btn-danger" href="#">Delete</a><a class="btn btn-warning" href="#">Edit</a>`;
    } else {
        result = `<a class="btn btn-primary" href="#">Like</a>`;
    }

    return result;
}