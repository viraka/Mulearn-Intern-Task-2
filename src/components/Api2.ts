import axios from 'axios'
import { AxiosError } from 'axios';
const baseUrl: string = 'https://www.mulearn.org/api/v1/mulearn-task/'
let accessToken: string = ''
let refreshToken: string = ''

interface LogFormat {
    username: string;
    isLoggedIn: boolean;
}

const getAccessToken = async () => {
    try {
        // Send a request to the server to refresh the access token
        const response = await axios.post('https://your-api.com/refresh', {
            refreshToken,
        });

        if (response.status === 200) {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
        }
    } catch (error) {
        // Handle errors, e.g., re-authenticate the user
    }
}

const register = async (username: string, password: string): Promise<boolean> => {
    try {
        await axios.post(`${baseUrl}register/`, {
            "username": username.toString(),
            "password": password.toString(),
        });
        return true
    } catch (error) {
        return false
    }
};

const login = async (username: string, password: string): Promise<string> => {

    try {
        const response = await axios.post(`${baseUrl}login/`, {
            "username": username.toString(),
            "password": password.toString(),
        });
        accessToken = response.data.acesss
        refreshToken = response.data.refresh

        return JSON.stringify(response.data)
    } catch (error) {
        return "Incorrect credentials"
    }
}

const logout = (username: string): void => {
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const userLog = log.find(user => user.username === username);
    if (userLog) {
        userLog.isLoggedIn = false;
    }
    updateLocalStorage(log)
}

const getTodos = async (): Promise<void> => {

    try {
        const response = await axios.get(`${baseUrl}todos/`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
        console.log(response.data)
    }
    catch (error: unknown) {
        if ((error as AxiosError).response?.status === 401) {
            // Access token has expired; refresh it
            await getAccessToken();
            // Retry the original request
            await getTodos();
        } else {
            // Handle other errors
            console.log(error)
        }
    }
}

const createTodo = (title: string): void => {
    const form = new FormData()
    form.append('title', title)
    //Do the form data thingy

    axios.post(`${baseUrl}todos/`, form, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}


const updateTodo = (id: number): void => {

    //Try updating the todo status here

    axios.put(`${baseUrl}todos/${id}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

const deleteTodo = (id: number): void => {

    //Try deleting the todo
    axios.delete(`${baseUrl}todos/${id}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })

}


export { register, login, getTodos, createTodo, updateTodo, deleteTodo }