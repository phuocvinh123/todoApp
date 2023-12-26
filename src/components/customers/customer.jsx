import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customer.css"
import {toast} from "react-toastify";
import Swal from 'sweetalert2'
import BorderExample from "../loading/loading";
import Spinner from 'react-bootstrap/Spinner';
export default function Customer() {
    const [customer,setCustomer]=useState([]);
  const [customers,setCustomers]=useState({
    id:0,
    name:"",
    gender:"male",
    address:"",
    age:"",
    isEdit: false
  })

  const resetForm =()=>{
    setCustomers({
      id:0,
      name:"",
      gender:"male",
      address:"",
      age:"",
      isEdit: false
    });
  }
  const [filterGender, setFilterGender] = useState("All");
  const [filterAge, setFilterAge] = useState('All');
  const [searchInput, setSearchInput] = useState("");
  const [update,setUpdate]= useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    fetch("https://65828d3b02f747c836799002.mockapi.io/todos")
        .then(response => response.json())
        .then(data => {
          const filteredGender = data.filter(customer => {
            const isGenderMatch = filterGender === "All" || customer.gender === filterGender;
            const isNameMatch = customer.name.toLowerCase().includes(searchInput.toLowerCase());
            return isGenderMatch && isNameMatch;
          });

          const filteredCustomers = filterAge !== "All" ? filteredGender.filter(customer => {
            const ageRange = JSON.parse(filterAge);
            const isAgeMatch = customer.age >= ageRange[0] && customer.age <= ageRange[1];
            return isAgeMatch;
          }) : filteredGender;

          const totalItems = filteredCustomers.length;
          const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
          setTotalPages(calculatedTotalPages);

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
          setCustomer(currentItems);
          setIsLoading(false);
        })
        .catch(error => console.error(error));
  }, [update,currentPage, itemsPerPage, filterGender, filterAge, searchInput]);

    // const handleChange= (evt)=> {
    //   if (evt.target.name === "name") {
    //     setCustomers({
    //       ...customers,
    //       name: evt.target.value
    //     })
    //   } else if (evt.target.name === "gender") {
    //     setCustomers({
    //       ...customers,
    //       gender: evt.target.value
    //     })
    //   }else if(evt.target.name === "address"){
    //     setCustomers({
    //      ...customers,
    //        address: evt.target.value
    //     })
    //   }else if(evt.target.name === "age"){
    //     setCustomers({
    //     ...customers,
    //       age: evt.target.value
    //     })
    //   }else if(evt.target.name === "filterGender"){
    //     setFilterGender(evt.target.value)
    //   }
    //   else if(evt.target.name ==="ageFillter"){
    //     setFilterAge(evt.target.value);
    //   }else {
    //     setSearchInput(evt.target.value);
    //   }
    // }
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "filterGender") {
      setFilterGender(value);
    } else if (name === "ageFilter") {
      setFilterAge(value);
    } else if (name === "searchInput") {
      setSearchInput(value);
    } else {
      setCustomers(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
const createCustomer=async ()=>{
      if(customers.isEdit) {
        let obj = customer.find(td => td.id === customers.id);
        obj.name = customers.name;
        obj.gender = customers.gender;
        obj.address = customers.address;
        obj.age = customers.age;

        try {
          const response = await fetch(`https://65828d3b02f747c836799002.mockapi.io/todos/${customers.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          });
          if (response.ok) {
            setCustomer([...customer]);
            setCustomers({
              id:0,
              name:"",
              gender:"male",
              address:"",
              age:"",
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

      }else {
        let customerNew = {
          ...customers,
        };

        try {
          const response = await fetch('https://65828d3b02f747c836799002.mockapi.io/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerNew),
          });
          if (response.ok) {
            setCustomer([...customer, customerNew]);
            setCustomers({
              id: 0,
              name: "",
              gender: "male",
              address: "",
              age: "",

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
}

  const handleEdit = (id) => {
    let objEdit = customer.find(td => td.id === id);
    setCustomers({
      ...objEdit,
      isEdit: true
    });
  }
const handleDelete= async (id)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await fetch(`https://65828d3b02f747c836799002.mockapi.io/todos/${id}`, {
          method: 'DELETE',
        });

        let deleteCustomer = customer.filter(td => td.id !== id);
        setCustomer(deleteCustomer);
        toast.success("Xóa thành công")
      } catch (error) {
        toast.error(error);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });


}

  return (
      <>
        {/*modal*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"
                    id="exampleModalLabel">{customers.isEdit ? "Modal Edit" : "Modal create"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" value={customers.name} className="form-control" id="name" name={"name"}
                         placeholder="Nhập tên..." onChange={handleChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select className="form-select" value={customers.gender}
                          id="gender" name="gender" onChange={handleChange}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" value={customers.address} className="form-control" id="address"
                         onChange={handleChange} name={"address"}
                         placeholder="Nhập địa chỉ..."/>
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" value={customers.age} className="form-control" id="age" onChange={handleChange}
                         name={"age"}
                         placeholder="Nhập tuổi..."/>
                </div>


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Close
                </button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                  createCustomer();
                  resetForm()
                }}>Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={"container justify-content-center"}>
          <h2>Customer Manager</h2>
        </div>
        <div className={" container d-flex "}>

          <div className={"justify-content-around me-5"}>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Create
            </button>
          </div>
          <div className="input-group" style={{width: '450px'}}>
            <input type="search" className="form-control" value={searchInput} name={"searchInput"}
                   onChange={handleChange}/>
            <button className="input-group-text btn-outline-secondary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="container d-flex row">
          <div className=" d-flex flex-column border-end col-3">
            <div>
              <h6>Gender:</h6>
              <select value={filterGender} name='filterGender' className="form-select form-select-sm"
                      aria-label=".form-select-sm example" onChange={handleChange}>
                <option value={"All"} selected>All</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>FeMale</option>
              </select>
            </div>
            <div>
              <h6>Age:</h6>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ageFilter" id="age_0" value={"All"}
                       onChange={handleChange} defaultChecked/>
                <label className="form-check-label" htmlFor="age_0">All</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ageFilter" id="age_1" value={"[10,30]"}
                       onChange={handleChange} defaultChecked=""/>
                <label className="form-check-label" htmlFor="age_1">10-30</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ageFilter" id="age_2" value={"[30,50]"}
                       onChange={handleChange} defaultChecked=""/>
                <label className="form-check-label" htmlFor="age_2">30-50</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ageFilter" id="age_3" value={"[50,70]"}
                       onChange={handleChange} defaultChecked=""/>
                <label className="form-check-label" htmlFor="age_3">50-70</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ageFilter" id="age_4" value={"[70,100]"}
                       onChange={handleChange} defaultChecked=""/>
                <label className="form-check-label" htmlFor="age_4">70-100</label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center col-9">
            <table className="table table-striped table-hover w-100">
              <thead>
              <tr className="table-info">
                <th>ID</th>
                <th>fullName</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {isLoading && <Spinner animation="border" />}
              {Array.isArray(customer) ? (
                  customer.map((cus) => (
                      <tr key={cus.id}>
                        <td>{cus.id}</td>
                        <td>{cus.name}</td>
                        <td>{cus.gender}</td>
                        <td>{cus.address}</td>
                        <td>{cus.age}</td>
                        <td>
                          <button className="btn btn-primary me-2" data-bs-toggle="modal"
                                  data-bs-target="#exampleModal" onClick={() => {
                            handleEdit(cus.id)
                          }}>
                            <span><i className="fa-solid fa-pen-to-square"></i></span>
                          </button>
                          <button className="btn btn-danger" onClick={() => {
                            handleDelete(cus.id)
                          }}>
                            <span><i className="fa-solid fa-trash-can"></i></span>
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <BorderExample/>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={"container d-flex justify-content-center"}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </>
  )
}
