import React, { useState, useEffect } from 'react'
import TodoFormat from '../TodoFormat.ts'
import { updateTodo, deleteTodo } from '../Api.ts'
import './Todolist.css'
interface Props {
  setTodos: React.Dispatch<React.SetStateAction<TodoFormat[]>>
  todos: TodoFormat[]
}



const Todolist: React.FC<Props> = ({ todos, setTodos }) => {

  const [tempTodos, setTempTodos] = useState<TodoFormat[]>(todos)

  useEffect(() => {
    setTempTodos(todos)
  }, [todos])

  const ToggleCompleted = (id: number): void => {
    const newTodos = [...todos]
    updateTodo(id)
    const todo = newTodos.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      setTodos(newTodos)
    }
    setTempTodos(newTodos)
  }

  const DeleteTodo = (id: number): void => {
    deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
    setTempTodos(todos)
  }

  const ClearCompleted = (): void => {
    setTodos(todos.filter(todo => !todo.completed))
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id)
      }
    })
    setTempTodos(todos)
  }

  const ShowAll = (): void => {
    setTempTodos(todos)
  }
  const ShowActive = (): void => {
    setTempTodos(todos.filter(todo => !todo.completed))
  }
  const ShowCompleted = (): void => {
    setTempTodos(todos.filter(todo => todo.completed))
  }

  return (
    <>
      <div className="todolist">
        {tempTodos.length === 0 && (
          <div className="todo" style={{ margin: '0px' }}>
            No tasks left
          </div>
        )}
        {tempTodos.map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="checkbox-border-wrap" onClick={() => ToggleCompleted(todo.id)}>
              <span className={`checkbox ${todo.completed ? "completed" : ""}`}></span>
            </div>
            <p className="todo-text">{todo.text}</p>
            <span className="delete" onClick={() => DeleteTodo(todo.id)}>&#x2716;</span>
          </div>
        ))}

      </div>
      <div className="todo end-todo">
        <div>
          {`${todos.length} items left`}
        </div>
        <div className='todo-inside'>
          <span className="filter" onClick={ShowAll}>All</span>
          <span className="filter" onClick={ShowActive}>Active</span>
          <span className="filter" onClick={ShowCompleted}>Completed</span>
        </div>
        <div className="clear-completed" onClick={ClearCompleted}>Clear Completed</div>
      </div>
      <div className="todo todofilter">
        <div>
          <span className="filter" onClick={ShowAll}>All</span>
          <span className="filter" onClick={ShowActive}>Active</span>
          <span className="filter" onClick={ShowCompleted}>Completed</span>
        </div>
      </div>
    </>
  )
}

export default Todolist