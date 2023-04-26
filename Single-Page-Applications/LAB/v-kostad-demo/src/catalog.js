const catalogSection = document.getElementById('catalog');
const catalogURL = 'http://localhost:3030/data/autoparts';
const table = catalogSection.querySelector('#table');
export async function showCatalog(){
    document.querySelector('main').replaceChildren(catalogSection);

    try {
        const token = localStorage.getItem('accessToken');
        const options = {
            method: 'get',
            headers: {}
        }

        if(token != null){
            options.headers['X-Authorization'] = token;
        }

        const response = await fetch(catalogURL, options);

        if(response.ok == false){
            const error = await response.json();
            throw error;
        }

        const data = await response.json();
    
        table.replaceChildren(...data.map(x => createRow(x)));
    } catch (err) {
        alert(err.message);
    }
}

function createRow(record){
    const element = document.createElement('tr');
    element.innerHTML = `
    <td>${record._id}</td>
    <td>${record.label}</td>
    <td>${record.price}</td>
    <td>${record.qty}</td>
    `;

    return element;
}