import axios from 'axios'
import { AxiosError } from 'axios';
import TodoFormat from './TodoFormat';
const baseUrl: string = 'https://www.mulearn.org/api/v1/mulearn-task/'

interface LogFormat {
    username: string;
    isLoggedIn: boolean;
}

interface responseFormat {
    id: number,
    title: string,
    isCompleted: Boolean,
    updated: string,
    created: string,
    host: number
}

// const getAccessToken = async () => {
//     try {

//         // Send a request to the server to refresh the access token
//         const response = await axios.post('https://your-api.com/refresh', {
//             refreshToken,
//         });

//         if (response.status === 200) {
//             accessToken = response.data.accessToken;
//             refreshToken = response.data.refreshToken;
//         }
//     } catch (error) {
//         // Handle errors, e.g., re-authenticate the user
//     }
// }

const register = async (username: string, password: string): Promise<boolean> => {
    try {
        await axios.post(`${baseUrl}register/`, {
            "username": username.toString(),
            "password": password.toString(),
        });
        const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
        log.push({
            username,
            isLoggedIn: false
        });
        localStorage.setItem('log', JSON.stringify(log));
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
        const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
        const user = log.find((users: LogFormat) => users.username == username)
        if (user) {
            user.isLoggedIn = true;
        }
        else {
            log.push({
                username,
                isLoggedIn: true
            });
        }
        localStorage.setItem('log', JSON.stringify(log));
        sessionStorage.setItem('accessToken', response.data.access);
        sessionStorage.setItem('refreshToken', response.data.refresh);
        return JSON.stringify(response.data)
    } catch (error) {
        return "Incorrect credentials"
    }
}


const getTodos = async (username: string): Promise<string> => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken)
    if (accessToken !== "" && accessToken !== null) {
        try {
            let response = await axios.get(`${baseUrl}todo/`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
            return JSON.stringify(response.data)
        }
        catch (error: any) {
            if ((error as AxiosError).response?.status === 401) {
                // Access token has expired; refresh it
                logout(username)
            } else {
                // Handle other errors
                console.log(error)
            }
            return "[]"
        }
    }
    return "[]"
}

// const getTodos = (username: string): string => {
//     const accessToken = sessionStorage.getItem('accessToken');
//     let res = ""
//     axios.get(`${baseUrl}todo/`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
//         .then(response => {
//             res = JSON.stringify(response.data)
//         })
//         .catch(error => {
//             console.log(error)
//             if (error.response?.status === 401) {
//                 logout(username)
//             }
//             res = "[]"
//         })
//     return res
// }

const logout = (username: string): void => {
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const userLog = log.find(user => user.username === username);
    if (userLog) {
        userLog.isLoggedIn = false;
    }
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('refreshToken', '');
    localStorage.setItem('log', JSON.stringify(log));
}


const createTodo = async (title: string): Promise<void> => {
    const accessToken = sessionStorage.getItem('accessToken');

    const form = new FormData()
    form.append('title', title)

    axios.post(`${baseUrl}todo/`, form, {
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
    const accessToken = sessionStorage.getItem('accessToken');
    axios.put(`${baseUrl}todo/${id}/`, {}, { headers: { 'Authorization': `Bearer ${accessToken}` } })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

const deleteTodo = (id: number): void => {
    const accessToken = sessionStorage.getItem('accessToken');
    // Try deleting the todo
    axios.delete(`${baseUrl}todo/${id}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const filter = (todos: string) => {
    const currTodos: responseFormat[] = JSON.parse(todos)
    const filteredArray: TodoFormat[] = currTodos.map((inputObject: responseFormat) => {
        const { id, title, isCompleted } = inputObject;
        return { id, text: title, completed: isCompleted };
    });
    return filteredArray
}


const isLoggedIn = (username: string): boolean => {
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const userLog = log.find(user => user.username === username);
    if (userLog) {
        return userLog.isLoggedIn;
    }
    return false;
}

export { register, login, getTodos, createTodo, updateTodo, deleteTodo, filter, isLoggedIn, logout, baseUrl }