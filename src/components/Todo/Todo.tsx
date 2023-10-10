import React from 'react'
interface Props {
    setTodo: React.Dispatch<React.SetStateAction<string>>
    todo: string
    handleAdd: (e: React.FormEvent) => void
}


const Todo: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }
    return (
        <>
            <form className="todo" onSubmit={handleAdd}>
                <div className="checkbox-border-wrap">
                    <span className="checkbox "></span>
                </div>
                <input
                    type="text"
                    name="todo-input"
                    className="todo-input"
                    id="todoInput"
                    placeholder="Create a new todo..."
                    value={todo}
                    onChange={handleChange}
                />
            </form>
        </>
    )
}

export default Todo