
import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
// import DogService from "../services/dog.service";
import UserService from '../services/user.service';

const ViewDate = () =>{
    const[date, setDate]=useState({});
    const{id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        UserService.ViewDate(id).then((res)=>setDate(res.data))
        .catch((err)=>console.log("error form get date details"));
    },{id})
    return(
        <div>
        <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>dateAndTime</td>
            <td>{date.dateAndTime}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>participants</td>
            <td>{date.participants}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>dogRestrictions</td>
            <td>{date.dogRestrictions}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>location</td>
            <td>{date.location}</td>
          </tr>
        
         
        </tbody>
      </table>
      <div className='dog-actions'>
    <button className="btn btn-outline-danger btn-lg btn-block" onClick="">Delete</button>
    
    <button className='btn btn-outline-info btn-lg btn-block' onClick="">Edit</button>
  </div>
    </div>
    )
}

export default ViewDate;