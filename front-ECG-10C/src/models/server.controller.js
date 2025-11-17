const ServerController = {};
const ENV = import.meta.env;

const API_URL = `https://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`

async function handleResponse(response) {
    if (!response) return null;
    const text = await response.text();
    try {
        return JSON.parse(text || 'null');
    } catch (e) {
        // not json
        return text;
    }
}

ServerController.getUser = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


ServerController.getUsers = async () => {
    try {
        const res = await fetch(`${API_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

ServerController.createUser = async (data) => {
    try {
        const res = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

ServerController.updateUser = async (id, data) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

ServerController.deleteUser = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(res);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default ServerController;
