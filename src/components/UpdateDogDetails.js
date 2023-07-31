import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DogService from '../services/dog.service';
import AuthService from "../services/auth.service";
import Alert from 'react-bootstrap/Alert';

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
  const [image, setImage] = useState("")
  const [showSuccessBanner, setShowSuccessBanner] = useState(false); // State variable for success banner

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
  const handleFileChange = (event) => {
    setDog({ ...dog, photo: event.target.files[0] });
    console.log("check...")
    console.log(event.target.files[0])
  }

  const handleUpdateDog_photo = (e) => {
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
    DogService.updateDog(id, formData)
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

        setShowSuccessBanner(true); // Show success banner after form submission
        setTimeout(() => {
          setShowSuccessBanner(false); navigate('/user') // Hide the success banner after a few seconds (adjust timing as needed)
        }, 5000);

      })
  }
  return (
    <div className='shadow-lg p-3 mb-5 bg-white rounded'>
      <h1>Updating Details of {dog.dogName}</h1>
      <form onSubmit={handleUpdateDog_photo}>
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
        {/* <div className="form-group">
          <input type="file" name="photo" onChange={handleFileChange} />
        </div> */}
        <div className="mb-3">
          <label for="formFile" className="form-label">Default file input example</label>
          <input className="form-control" type="file" id="formFile" name="photo" onChange={handleFileChange} />
        </div>

        <div>
          {image == "" || image == null ? "" : <img width={100} height={100} src={image}></img>}

        </div>

        <input
          type='submit'
          className='btn btn-outline-warning btn-block mt-4'
        />


      </form>
      <div style={{ paddingTop: 10 }}>
        {showSuccessBanner && (
          <Alert variant="success" >
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep things
              nice and tidy.
            </p>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default UpdateDogDetails;