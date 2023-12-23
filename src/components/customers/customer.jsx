import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./customer.css"
export default function Customer() {
    const [customer,setCustomer]=useState([]);
    useEffect(() => {
        fetch("https://65828d3b02f747c836799002.mockapi.io/todos")
          .then(response => response.json())
          .then(data => setCustomer(data))
          .catch(error => console.error(error));
      }, []);



  return (
  <>
    <div className={" container d-flex "}>
      <div className={"justify-content-around me-5"}>
        <button type="button" className="btn btn-outline-primary">Create</button>
      </div>
      <div className="input-group" style={{width:'450px'}}>
        <input type="search" className="form-control"/>
        <button className="input-group-text btn-outline-secondary">
        <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div className="container d-flex row">
      <div className=" d-flex flex-column border-end col-3">
        <div>
          <h6>Gender:</h6>
          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected="">All</option>
            <option>Male</option>
            <option>Fe Male</option>
          </select>
        </div>
        <div>
          <h6>Age:</h6>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="age" id="age_1"/>
            <label className="form-check-label" htmlFor="age_1">10-30</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="age" id="age_2" defaultChecked=""/>
            <label className="form-check-label" htmlFor="age_2">30-50</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="age" id="age_3" defaultChecked=""/>
            <label className="form-check-label" htmlFor="age_3">50-70</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="age" id="age_4" defaultChecked=""/>
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
          {customer.map((cus)=>(
            <tr key={cus.id}>
              <td>{cus.id}</td>
              <td>{cus.fullName}</td>
              <td>{cus.gender}</td>
              <td>{cus.address}</td>
              <td>{cus.age}</td>
              <td>
                <button className="btn btn-primary me-2"><span><i className="fa-solid fa-pen-to-square"></i></span>
                </button>
                <button className="btn btn-danger"><span><i className="fa-solid fa-trash-can"></i></span></button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  
  )
}
