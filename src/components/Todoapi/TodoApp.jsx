import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TodoApp() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     const [update,setUpdate]= useState(true);
     const [filterType, setFilterType] = useState("All");
     const resetForm = () => {
      setTodo({
        id: 0,
        name: "",
        type: "Important",
        isEdit: false
      });
    };
    const [todos,setTodos]= useState([])

    const [todo,setTodo]=useState({
        id:0,
        name:"",
        type:"Important",
        isEdit:false
    })

    const handleChange=(evt)=>{
        if(evt.target.name === "nameTodo"){
            setTodo({
                ...todo,
                name:evt.target.value
            })
        }else if(evt.target.name === "typeTodo"){
            setTodo({
                ...todo,
                type:evt.target.value
            })
        }else  {
          setFilterType(evt.target.value);
      // } else {
      //     setSearchInput(evt.target.value);
      // }
      }
    }

    useEffect(() => {
      fetch("https://65828d3b02f747c836799002.mockapi.io/todos")
        .then(response => response.json())
        .then(data => {
          const filteredTodos = data.filter(todo => {
            const isTypeMatch = filterType === "All" || todo.type === filterType;
            // const isNameMatch = todo.name.toLowerCase().includes(searchInput.toLowerCase());
            return isTypeMatch ;
          });
          setTodos(filteredTodos);
        })
        .catch(error => console.error(error));
    }, [update, filterType]);

      const handleAddEditTodo = async () => {
        if (todo.isEdit) {
          let obj = todos.find(td => td.id === todo.id);
          obj.name = todo.name;
          obj.type = todo.type;
      
          try {
            const response = await fetch(`https://65828d3b02f747c836799002.mockapi.io/todos/${todo.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
      
            if (response.ok) {
              setTodos([...todos]);
              setTodo({
                id: 0,
                name: "",
                type: "Important",
                isEdit: false
              });
              toast.success("sửa thành công")

              setUpdate(prevState => !prevState)
            } else {
              throw new Error("Error updating todo");
            }
          } catch (error) {
            toast.error(error);
          }
        } else {
          let todoNew = {
            ...todo
          };
      
          try {
            const response = await fetch('https://65828d3b02f747c836799002.mockapi.io/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(todoNew),
            });
      
            if (response.ok) {
              setTodos([...todos, todoNew]);
              setTodo({
                id: 0,
                name: "",
                type: "Important"
              });
              toast.success("Thêm mới thành công")
              setUpdate(prevState => !prevState)
            } else {
              throw new Error("Error creating todo");
            }
          } catch (error) {
            toast.error(error);
          }
        }
      };

      const handleEdit = (id) => {
        let objEdit = todos.find(td => td.id === id);
        setTodo({
            ...objEdit,
            isEdit: true
        });
    }
    const handleDelete = async (id) => {
        try {
          await fetch(`https://65828d3b02f747c836799002.mockapi.io/todos/${id}`, {
            method: 'DELETE',
          });
      
          let deleteTodo = todos.filter(td => td.id !== id);
          setTodos(deleteTodo);
          toast.success("Xóa thành công")
        } catch (error) {
            toast.error(error);
        }
      };

  return (
    <>
    <div className='d-flex justify-content-center' >
        <div className='col-6'>
            <h1>Todo App</h1>


         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {todo.isEdit?"Modal Edit" : "Modal create"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nhập name:</Form.Label>
              <Form.Control type="text" name='nameTodo' value={todo.name} placeholder='Nhập name' autoFocus onChange={handleChange}/></Form.Group>
              <Form.Select aria-label="Default select example" name='typeTodo' value={todo.type} onChange={handleChange}>
              <option>Important</option>
              <option>Normal</option>
               </Form.Select>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleClose();resetForm()}}> Close </Button>
          <Button variant="primary" onClick={()=>{handleAddEditTodo();handleClose();}}> Save Changes </Button>
        </Modal.Footer>
      </Modal>

            {/* <div className='row mb-3'>
                        <label className='label-control mb-2'>Nhập name: </label>
                        <input name='nameTodo' value={todo.name} className='form-control' type="text" placeholder='Nhập name' onChange={handleChange}/>
                        <select name='typeTodo' value={todo.type} className='form-select mt-2' onChange={handleChange} >
                            <option>Important</option>
                            <option>Normal</option>
                        </select>
                    </div> */}
       
        <div className='row d-flex justify-content-center' >
                        <div className='row justify-content-between mb-5'>
                            <button className='col-2 btn btn-primary' onClick={handleShow} >Thêm</button>
                            {/* {todo.isEdit && <button className='col-2 btn btn-danger' >Cancel</button>} */}
                            <div className='col-3'>
                                <select value={filterType} name='filterType' className='form-select'  onChange={handleChange}>
                                <option value="All">All</option>
                                <option value="Important">Important</option>
                                <option value="Normal">Normal</option>
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
                                <button className='btn btn-primary me-3' onClick={(evt) => {handleShow(); handleEdit(todo.id) }}>Edit</button>
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
