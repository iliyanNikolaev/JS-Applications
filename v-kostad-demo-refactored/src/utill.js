export function addSubmitListener(form, callback){
    form.addEventListener('submit', onSubmit);

    function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        return callback(data);
    }
}