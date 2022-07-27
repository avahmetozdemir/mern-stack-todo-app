import React,{useEffect, useState} from 'react'
import {useGlobalContext} from '../context'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Todos() {
    const {credentials,activeId} = useGlobalContext()
    const [todos,setTodos] = useState([])
    const [todoText,setTodoText] = useState('')
    const [filter,setFilter] = useState('uncompleted')
    const [ editing, setEditing] = useState(false)
    const [edited,setEdited] = useState(null)
   
    const createFetch =(newTodos)=> {
         fetch('http://localhost:3500/api/v1/todos/create',{
            method:'POST',
            headers: {
                'Content-Type' : "application/json",
                Authorization: `Basic ${credentials.username}:${credentials.password}`
            },
            body: JSON.stringify(newTodos),
        })
    }

    const deleteFetch = (todoId)=> {
        fetch(`http://localhost:3500/api/v1/todos/${todoId}`,{
            method: 'DELETE'
        })
    }

    
    useEffect(()=> {
        fetch(`http://localhost:3500/api/v1/todos/${activeId}`,{
            method:'GET',
            headers: {
                'Content-Type' : "application/json",
                Authorization: `Basic ${credentials.username}:${credentials.password}`
            },
        }).then((response)=> response.json()).then(todos=>setTodos(todos))
    },[])
    
    const updateFetch = (todoId,update) => {
        fetch(`http://localhost:3500/api/v1/todos/${todoId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "checked": update
            }),

        }, )
    }
    
    
    const addTodo = (e)=> {
        e.preventDefault()
        if(!todoText)return
        const newTodo = {id:activeId, checked:false, text: todoText}
        const newTodos= [...todos,newTodo]
        setTodos(newTodos)
        setTodoText('')
        createFetch(newTodo)
    }

    const toggleTodo=(id)=> {
        const newTodoList= [...todos]
        const todoItem = newTodoList.find(todo=>todo._id === id)
        todoItem.checked = !todoItem.checked
        console.log(todoItem.checked);
        updateFetch(todoItem._id,todoItem.checked)
        setTodos(newTodoList)

    }

    const deleteTodo=(id)=> {
        const newTodoList= [...todos]
        const justNewTodoList=  newTodoList.filter(todo=> todo._id !== id)
        deleteFetch(id)
        setTodos(justNewTodoList)

    }


    // const changeFilter=(newFilter)=> {
    //     setFilter(newFilter)
    // }

    // const getTodos = ()=> {
    //     return todos.filter(todo=> filter === 'completed' ? todo.checked : !todo.checked)
    // }
  return (
    <div>
        {/* <select value={filter} onChange={e=>changeFilter(e.target.value)} >
            <option value="completed">Completed </option>
            <option value="uncompleted">Uncompleted </option>
        </select> */}
        {todos.map((todo)=> <div key={todo._id}>
                <input checked={todo.checked} onChange={()=>toggleTodo(todo._id)} type="checkbox" />
                <label className='fs-2 m-2' >{todo.text}</label>
                <Button variant="outline-danger" onClick={()=>deleteTodo(todo._id)}>Delete</Button>
            </div>
        )}
        <br/>

    <Form onSubmit={addTodo}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fs-1'>ToDos</Form.Label>
        <Form.Control value={todoText} onChange={(e)=>setTodoText(e.target.value)} type="text" placeholder="What is your task?" />
      </Form.Group>
      <Button variant="outline-success" type='submit'>Add</Button>
    </Form>

        {/* <form onSubmit={addTodo}>
        <input value={todoText} type="text" onChange={(e)=>setTodoText(e.target.value)} />
        <Button variant="outline-success" type='submit'>Add</Button>
        </form> */}
    </div>
  )
}

export default Todos