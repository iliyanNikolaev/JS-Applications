const root = document.querySelector('#root'); 
const detailsView = document.querySelector('#details-view');
const idEl = document.querySelector('#_id');
const brandEl = document.querySelector('#brand');
const gpuEl = document.querySelector('#gpu');
const cpuEl = document.querySelector('#cpu');

export async function showDetails(id) {
    try {
        const res = await fetch('http://localhost:3030/data/laptops/'+id);
        if(!res.ok){
            const error = await res.json();
            throw error;
        }
        const data = await res.json();

        idEl.textContent = data._id;
        brandEl.textContent = data.brand;
        gpuEl.textContent = data.gpu;
        cpuEl.textContent = data.cpu;
        root.replaceChildren(detailsView);
    } catch (err) {
        alert(err.message);
    }

}