import React, { useState, useEffect } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.tsx'
import Todo from '../../components/Todo/Todo.tsx'
import Todolist from '../../components/Todolist/Todolist.tsx'
import TodoFormat from '../../components/TodoFormat.ts'
import { isLoggedIn, logout, createTodo, getTodos, filter } from '../../components/Api.ts'
import { } from '../../components/Api.ts'

const TodoPage: React.FC = () => {
    const [theme, setTheme] = useState<string>("light")
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<TodoFormat[]>([])
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getTodos(username || "")
            .then((response: string) => {
                setTodos(filter(response))
            })
    }, []);


    const LogOut = () => {
        logout(username || "")
        navigate("/login")
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (todo !== "") {
            createTodo(todo).then(() => {
                getTodos(username || "")
                    .then((response: string) => {
                        setTodos(filter(response))
                        getTodos(username || "")
                            .then((response: string) => {
                                setTodos(filter(response))
                            })
                    })
                setTodo("")
            })
        }
    }
    return (
        <>
            {!isLoggedIn(username || "") && <Navigate to="/login" />}
            <div className={`wrapper ${theme}`}>
                <div className="container">
                    <Header theme={theme} setTheme={setTheme} />
                    <Todo todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                    <Todolist todos={todos} setTodos={setTodos} />
                    <div className="logout todo" onClick={LogOut}>Logout</div>
                </div>
            </div>

        </>
    )
}

export default TodoPage
