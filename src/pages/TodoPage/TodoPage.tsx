import React, { useState, useEffect } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.tsx'
import Todo from '../../components/Todo/Todo.tsx'
import Todolist from '../../components/Todolist/Todolist.tsx'
import TodoFormat from '../../components/TodoFormat.ts'
import { isLoggedIn, logout } from '../../components/Auth.ts'
import { retreiveTodos, updateTodos } from '../../components/Storage.ts'

const TodoPage: React.FC = () => {
    const [theme, setTheme] = useState<string>("light")
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<TodoFormat[]>([])
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const newTodos = retreiveTodos(username || "")
        if (newTodos.length) {
            setTodos(newTodos)
        }
    }, [])

    useEffect(() => {
        updateTodos(username || "", todos)
    }, [todos])

    const LogOut = () => {
        logout(username || "")
        navigate("/login")
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (todo !== "") {
            setTodos([...todos, { id: Math.random(), text: todo, completed: false }])
            setTodo("")
            console.log(todos)
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
