import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DogService from "../services/dog.service";
import axios from 'axios';
import authHeader from '../services/auth-header';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";


const Dog = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [dog, setDog] = useState({
        dogName: '',
        dogAge: '',
        dogBreed: '',
        dogSize: '',
        dogTemperament: "",
        ownerId: currentUser.id,
        photo: ""
    })
    const [image, setImage] = useState("")
    const onChange = (e) => {

        setDog({ ...dog, [e.target.name]: e.target.value })
    }
    const handleFileChange = (event) => {
        setDog({ ...dog, photo: event.target.files[0] });
        console.log("check...")
        console.log(event.target.files[0])
    }

    const handleFileChange2 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () =>{
            // console.log(reader.result); //base 64 string
            setImage(reader.result)
            setDog({ ...dog, photo: reader.result });
        }
        reader.onerror = error =>{
            console.log("error" + error)
        }
        
    }

    const handleCreateDog = (e) => {
        e.preventDefault();
        // console.log(dog)
        DogService.AddDog(dog)
            .then((res) => {
                // console.log("checking dog created..." + dog);
                setDog({
                    dogName: '',
                    dogAge: '',
                    dogBreed: '',
                    dogSize: '',
                    dogTemperament: "",
                    photo: ""
                    // ownerId:""
                });

                navigate('/user')
            })
    }

    const handleCreateDog_photo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('dogName', dog.dogName);
        formData.append('dogAge', dog.dogAge);
        formData.append('dogBreed', dog.dogBreed);
        formData.append('dogSize', dog.dogSize);
        formData.append('dogTemperament', dog.dogTemperament);
        formData.append('ownerId', dog.ownerId);
        formData.append('photo', dog.photo);
        // console.log(formData)
        DogService.AddDog(formData)
            .then((res) => {
                // console.log("checking dog created..." + dog);
                setDog({
                    dogName: '',
                    dogAge: '',
                    dogBreed: '',
                    dogSize: '',
                    dogTemperament: "",
                    ownerId: currentUser.id,
                    photo: ""
                    // ownerId:""
                });

                navigate('/user')
            })
    }


    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            <form onSubmit={handleCreateDog_photo} encType="multipart/form-data">
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
                    <select name="dogAge" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>



                <div className="form-group">
                    <label htmlFor="username">Breed</label>
                    <select name="dogBreed" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Labrador">Labrador</option>
                        <option value="French Bulldog">French Bulldog</option>
                        <option value="English Bulldog">English Bulldog</option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Beagle">Beagle</option>
                        <option value="German Shepherd">German Shepherd</option>
                    </select>
                </div>



                <div className="form-group">
                    <label htmlFor="username">Size</label>
                    <select name="dogSize" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Giant">Giant</option>

                    </select>
                </div>



                <div className="form-group">
                    <label htmlFor="username">Temperament</label>
                    <select name="dogTemperament" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Assertive ">Assertive </option>
                        <option value="aggressive">aggressive</option>
                        <option value="neutral">neutral</option>
                        <option value="passive">passive</option>

                    </select>
                </div>
                <div className="form-group">
                    <input type="file" name="photo" onChange={handleFileChange} />
                </div>

                <div>
                    {image==""||image==null?"":<img width={100} height={100} src={image}></img> }
                    
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