import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Test from './test'
import { TodoType } from './types'
import TodoItem from './TodoItem'

const TodoFactory = () => {
  let i = 0;
  return (name: string) => {
    return { name, id: (i++).toString() }
  }
}

const createTodo = TodoFactory();

const todoList: Array<TodoType> = ["what", "fetch milk", "create an app", "what a life"]
  .map(name => createTodo(name))

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<Array<TodoType>>(todoList);
  
  return (
    <div className="App">
      <header className="App-header">
        {todos.map(({ name, id }) => <TodoItem key={id} name={name} id={id} />)}
      </header>
    </div>
  )
}

export default App
