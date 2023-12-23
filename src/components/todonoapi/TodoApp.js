import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Todo from "./Todo"
import "./Todo.css"

const initTodo=[
    new Todo(1, "Buy Milk", "important"),
    new Todo(2, "Buy Eggs", "important"),
    new Todo(3, "Buy Flour", "normal"),
]

export default function TodoApp() {
    const [todos,setTodos]= useState(initTodo);
    
    const [todo,setTodo]=useState({
        id:0,
        name:"",
        type:"important",
        isEdit:false
    })

    const handleChange=(evt)=>{
        if(evt.target.name === "nameTodo"){
            setTodo({
                ...todo,
                name:evt.target.value
            })
        }else{
            setTodo({
                ...todo,
                type:evt.target.value
            })
        }
    }

    const handleAddEditTodo=(evt)=>{
        if(todo.isEdit){
            let obj = todos.find(td => td.id === todo.id);
            obj.name = todo.name;
            obj.type = todo.type;

            setTodos([...todos]);
            setTodo({
                id: 0,
                name: "",
                type: "Important",
                isEdit: false
            })
        }else{let todoNew={
            ...todo,
            id: ++Todo.currentId
        }
        console.log(todoNew);
        setTodos([...todos,todoNew])
        setTodo({
            id:0,
            name:"",
            type:"important"
        });}
        
    }
    const handleEdit = (id) => {
        let objEdit = todos.find(td => td.id === id);
        setTodo({
            ...objEdit,
            isEdit: true
        });
    }
    const handleDelete=(id)=>{
        let deleteTodo = todos.filter(td => td.id !== id);
        setTodos(deleteTodo);
    }

  return (
    <>
    <div className='d-flex justify-content-center' >
        <div className='col-6'>
            <h1>Todo App</h1>
            <div className='row mb-3'>
                        <label className='label-control mb-2'>Nhập name: </label>
                        <input name='nameTodo' value={todo.name} className='form-control' type="text" placeholder='Nhập name' onChange={handleChange}/>
                        <select name='typeTodo' value={todo.type} className='form-select mt-2'onChange={handleChange} >
                            <option>Important</option>
                            <option>Normal</option>
                        </select>
                    </div>
       
        <div className='row d-flex justify-content-center' >
                        <div className='row justify-content-between mb-5'>
                            <button className='col-2 btn btn-primary'  onClick={handleAddEditTodo}>{todo.isEdit ? "Cập nhật" : "Thêm"}</button>
                            {todo.isEdit && <button className='col-2 btn btn-danger' >Cancel</button>}
                            <div className='col-3'>
                                <select className='form-select'>
                                    <option>Important</option>
                                    <option>Normal</option>
                                </select>
                            </div>
                        </div>

                        <Table striped bordered hover>
                        <thead >
                           <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Action</th>
                            </tr> 
                            </thead>
                            <tbody>
                            {
                          todos.map((todo)=>(
                          <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td>{todo.type}</td>
                            <td>
                                <button className='btn btn-primary me-3' onClick={(evt) => { handleEdit(todo.id) }}>Edit</button>
                                <button className='btn btn-danger' onClick={(evt)=>{handleDelete(todo.id)}}>Delete</button>
                            </td>
                          </tr>
            ))
        }
                            </tbody> 
                            </Table>
        </div>
        </div>
    </div>
    </>
  )
}
