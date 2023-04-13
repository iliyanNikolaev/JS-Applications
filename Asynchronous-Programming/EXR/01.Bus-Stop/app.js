function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let stopNameContainer = document.getElementById('stopName');
    let busesContainer = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    let response = fetch(url)
        .then(response => response.json())
        .then(response => {
            busesContainer.innerHTML = '';
            let stopName = response.name;
            let buses = Object.entries(response.buses);

            stopNameContainer.textContent = stopName;

            buses.forEach(bus => {
                let li = document.createElement('li');
                li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
                busesContainer.appendChild(li);
            })
        })
        .catch(error => {
            stopNameContainer.textContent = 'Error';
        });
}