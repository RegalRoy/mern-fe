import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DogService from '../services/dog.service';
import AuthService from "../services/auth.service";

const UpdateDogDetails = () => {
  const currentUser = AuthService.getCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate()
  const [dog, setDog] = useState({
    dogName: "",
    dogAge: "",
    dogBreed: "",
    dogSize: "",
    dogTemperament: "",
    ownerId: currentUser.id
  })
  const onChange = (e) => {
    setDog({ ...dog, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    DogService.getDog(id).then((res) => setDog(res.data))
      .catch((err) => console.log("error form update dog details"));
  }, { id })

  const updateDog = (e) => {
    e.preventDefault();

    DogService.updateDog(id, dog); navigate("/user")
  }
  return (
    <div>
      <h1>Updating Details of {dog.dogName}</h1>
      <form onSubmit={updateDog}>
        <div className="form-group">
          <label htmlFor="username">Dog Name</label>
          <input
            type="text"
            className="form-control"
            name="dogName"
            value={dog.dogName}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="username">Dog Age</label>
          <input
            type="text"
            className="form-control"
            name="dogAge"
            value={dog.dogAge}
            onChange={onChange}
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="username">Breed</label>
          <input
            type="text"
            className="form-control"
            name="dogBreed"
            value={dog.dogBreed}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Size</label>
          <input
            type="text"
            className="form-control"
            name="dogSize"
            value={dog.dogSize}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Temperament</label>
          <input
            type="text"
            className="form-control"
            name="dogTemperament"
            value={dog.dogTemperament}
            onChange={onChange}
          />

        </div> */}


        <div className="form-group">
          <label htmlFor="username">Dog Age</label>
          <select name="dogAge" id="pet-select" onChange={onChange} value={dog.dogAge}>
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
          <select name="dogBreed" id="pet-select" onChange={onChange} value={dog.dogBreed}>
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
          <select name="dogSize" id="pet-select" onChange={onChange} value={dog.dogSize}>
            <option value="">--Please choose an option--</option>
            <option value="Small" >Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Giant">Giant</option>

          </select>
        </div>


        <div className="form-group">
          <label htmlFor="username">Temperament</label>
          <select name="dogTemperament" id="pet-select" onChange={onChange} value={dog.dogTemperament}>
            <option value="">--Please choose an option--</option>
            <option value="Assertive ">Assertive </option>
            <option value="aggressive">aggressive</option>
            <option value="neutral">neutral</option>
            <option value="passive">passive</option>

          </select>
        </div>

        <input
          type='submit'
          className='btn btn-outline-warning btn-block mt-4'
        />
      </form>
    </div>
  )
}

export default UpdateDogDetails;