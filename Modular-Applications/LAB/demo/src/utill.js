export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function removeUserData() {
    localStorage.clear();
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const data = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, v.trim()]));

        return callback(data, form)
    }
}

export function validatePartData(partData) {
    const label = partData.label;
    const price = Number(partData.price);
    const qty = Number(partData.qty);
    
    if (label == '') {
        throw new Error('Please fill all fields!')
    }

    if (price <= 0 || Number.isNaN(price)) {
        throw new Error('Price must be a positive number!')
    }

    if (Number.isNaN(qty) || qty < 0 || Number.isInteger(qty) == false) {
        throw new Error('Stock number must be a non-negative integer!')
    }

    return {
        label,
        price,
        qty
    }
}