export function getUserData(){
    return JSON.parse(localStorage.getItem('userData'));
}

export function setUserData(userData){
    localStorage.setItem('userData' ,JSON.stringify(userData));
}

export function removeUserData(){
    localStorage.clear();
}

export function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        
        const form = event.currentTarget;
        const formData = new FormData(form);

        const data = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, v.trim()]));
        
        return callback(data, form)
    }
}