function solve() {
    
    let stop = {
        next: 'depot'
    }
    

    let container = document.getElementById('info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        let response = fetch(url)
            .then(response => response.json())
            .then(response => {

                stop = response;

                container.textContent = `Next stop ${stop.name}`;

                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(err => {
                container.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        container.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();