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
        <div className="form-group">
          <label htmlFor="username">Dog Age</label>
          <input
            type="text"
            className="form-control"
            name="dogAge"
            value={dog.dogAge}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
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