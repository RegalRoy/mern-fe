import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import DogService from "../services/dog.service";
import axios from 'axios';
import authHeader from '../services/auth-header';
import {useNavigate} from 'react-router-dom';
import AuthService from "../services/auth.service";


const Dog = ()=>{
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const[dog,setDog]=useState({
        dogName: '',
        dogAge: '',
        dogBreed: '',
        dogSize: '',
        dogTemperament: '',
        ownerId:currentUser.id
    })
    const onChange = (e) =>{
        setDog({...dog,[e.target.name]:e.target.value})
    }
//     useEffect(()=>{
//     DogService.AddDogTest().then(
//         (r)=>{setDog(r.data)}
//     )
// })

    const handleCreateDog_ = (e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8080/api/test/dog" ,dog , {headers:authHeader()})
        .then((res)=>{
            setDog({
                dogName: '',
                dogAge: '',
                dogBreed: '',
                dogSize: '',
                dogTemperament: '',
            });
            // navigate('/')
            
        })
    }

    const handleCreateDog =(e)=>{
        e.preventDefault();
        console.log(currentUser.id)
        DogService.AddDog(dog)
        .then((res)=>{
            setDog({
                dogName: '',
                dogAge: '',
                dogBreed: '',
                dogSize: '',
                dogTemperament: '',
                // ownerId:""
            });
            navigate('/user')
        })
    }

    return(
        <div>
            <form onSubmit={handleCreateDog}>
            <div className="form-group">
            <label htmlFor="username">Dog Name</label>
            <input
              type="text"
              className="form-control"
              name="dogName"
              onChange={onChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="username">Dog Age</label>
            <input
              type="text"
              className="form-control"
              name="dogAge"
              onChange={onChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="username">Breed</label>
            <input
              type="text"
              className="form-control"
              name="dogBreed"
              onChange={onChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="username">Size</label>
            <input
              type="text"
              className="form-control"
              name="dogSize"
              onChange={onChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="username">Temperament</label>
            <input
              type="text"
              className="form-control"
              name="dogTemperament"
              onChange={onChange}
            />
            
            </div>
                
            <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                  />
            </form>
        </div>
    )
}

export default Dog;