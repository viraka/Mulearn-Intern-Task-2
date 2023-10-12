import TodoFormat from "./TodoFormat.ts";
import { updateLocalStorage } from './Storage.ts'
/*

users:[
    {
        username: 'admin',
        password: 'admin',
        todos:[
            {
                id: 1,
                text:'',
                completed: false

            },

        ]
    },
    {
        username: 'admin',
        password: 'admin',
        todos:[
            {
                
            }
        ]
    },
    ...
]

log:[
    {
        username: 'admin',
        isLoggedIn: false
    },
    {
        username: 'admin2',
        isLoggedIn: false
    },
    ...
]
*/



interface User {
    username: string;
    password: string;
    todos: TodoFormat[];
}

interface LogFormat {
    username: string;
    isLoggedIn: boolean;
}




const login = (username: string, password: string): boolean => {

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        const userLog = log.find(user => user.username === username);
        if (userLog) {
            userLog.isLoggedIn = true;
        }
        console.log(log)
        updateLocalStorage(users, log)
        return true;
    }
    return false;

}

const logout = (username: string): void => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const userLog = log.find(user => user.username === username);
    if (userLog) {
        userLog.isLoggedIn = false;
    }
    updateLocalStorage(users, log)
}

const isLoggedIn = (username: string): boolean => {
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const userLog = log.find(user => user.username === username);
    if (userLog) {
        return userLog.isLoggedIn;
    }
    return false;
}

const register = (username: string, password: string): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');
    const user = users.find(user => user.username === username);
    if (user) {
        return false;
    }
    users.push({
        username,
        password,
        todos: []
    });
    log.push({
        username,
        isLoggedIn: false
    });
    updateLocalStorage(users, log)
    return true;
}



export { login, isLoggedIn, logout, register };
