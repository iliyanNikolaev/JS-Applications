const itemName = 'userData';

export function getUserData(){
    return JSON.parse(localStorage.getItem(itemName));
}

export function setUserData(data){
    localStorage.setItem(itemName, JSON.stringify(data));
}

export function clearUserData(){
    localStorage.removeItem(itemName);
}

export function submitHandler(callback){
    return function (e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        return callback(data, e.target);
    }
}