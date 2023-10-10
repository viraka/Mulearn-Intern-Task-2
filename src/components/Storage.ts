import TodoFormat from "./TodoFormat";
interface User {
    username: string;
    password: string;
    todos: TodoFormat[];
}

interface LogFormat {
    username: string;
    isLoggedIn: boolean;
}





const retreiveTodos = (username: string): TodoFormat[] => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');

    const user = users.find(user => user.username === username);
    if (user) {
        console.log("retreiveTodos")
        updateLocalStorage(users, log)
        return user.todos;
    }
    return [];
}


const updateTodos = (username: string, todos: TodoFormat[]): void => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const log: LogFormat[] = JSON.parse(localStorage.getItem('log') || '[]');

    const user = users.find(user => user.username === username);
    if (user) {
        console.log("updateTodos")
        user.todos = [...todos];
        updateLocalStorage(users, log)
    }
}

const updateLocalStorage = (newUsers: User[], newLog: LogFormat[]): void => {
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('log', JSON.stringify(newLog))
}

export { retreiveTodos, updateLocalStorage, updateTodos } 