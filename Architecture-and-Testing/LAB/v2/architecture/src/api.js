export async function getData(url) {
    const options = {
        method: 'get',
        headers: {}
    }
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            const error = await res.json();
            throw error;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        return alert(err.message);
    }
}