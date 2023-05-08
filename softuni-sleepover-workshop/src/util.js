export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data))
}

export function getUserData(){
    const userData = sessionStorage.getItem('userData');

    return JSON.parse(userData);
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}

export function createPointer(className, objectId){
    return { __type: 'Pointer', className, objectId }
}

export function addOwner(record, ownerId){
    const data = Object.assign({}, record)

    data.owner = createPointer('_User', ownerId);

    return data;
}

export function submitHandler(callback){
    return function(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        for (const key in data) {
            data[key] = data[key].trim();
        }

        return callback(data, e.target);
    }
}