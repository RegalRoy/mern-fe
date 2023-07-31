import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DogService from "../services/dog.service";
import DogCard from './DogCard';
import Alert from 'react-bootstrap/Alert';

const ShowDogDetails = () => {
  const [dog, setDog] = useState({});
  const [showSuccessBanner, setShowSuccessBanner] = useState(false); // State variable for success banner

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    DogService.getDog(id).then((res) => setDog(res.data))
      .catch((err) => console.log("error form get dog details"));
  }, [id])
  const onDelete = (id) => {
    DogService.deleteDog(id).then((res) => {
      setShowSuccessBanner(true); // Show success banner after form submission
      setTimeout(() => {
        setShowSuccessBanner(false); navigate('/user') // Hide the success banner after a few seconds (adjust timing as needed)
      }, 5000);
    })
      .catch((err) => console.log("error form get delte dogs"));
  }
  const onUpdate = (id) => {
    navigate('/update-dog/' + id)
  }
  const dogPic = <DogCard dog={dog} />
  return (
    <div className='shadow-lg p-3 mb-5 bg-white rounded'>
      <table className="">
        <tbody>
          <tr>
            {/* <th scope='row'>1</th> */}
            <td>Name</td>
            <td>{dog.dogName}</td>
          </tr>
          <tr>
            {/* <th scope='row'>2</th> */}
            <td>Age</td>
            <td>{dog.dogAge}</td>
          </tr>
          <tr>
            {/* <th scope='row'>3</th> */}
            <td>Breed</td>
            <td>{dog.dogBreed}</td>
          </tr>
          <tr>
            {/* <th scope='row'>4</th> */}
            <td>Size</td>
            <td>{dog.dogSize}</td>
          </tr>
          <tr>
            {/* <th scope='row'>5</th> */}
            <td>Temperament</td>
            <td>{dog.dogTemperament}</td>
          </tr>

        </tbody>
      </table>
      <div>
        <div>
          {Object.keys(dog).length > 0 ? ( // Check if dog object is not empty before rendering
            <div>
              <table className='table'>
                {/* ... table rows here ... */}
              </table>
              <div>
                <DogCard dog={dog} />
              </div>
              <div className='dog-actions'>
                <button className="btn btn-danger" onClick={() => onDelete(dog._id)}>Delete</button>
                <button className='btn btn-primary' onClick={() => onUpdate(dog._id)}>Edit</button>
              </div>
            </div>
          ) : (
            <p>Loading...</p> // Render a loading message while data is being fetched
          )}
        </div>
      </div>
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

export default ShowDogDetails;