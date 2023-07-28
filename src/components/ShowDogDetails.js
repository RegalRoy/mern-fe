import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DogService from "../services/dog.service";
import DogCard from './DogCard';

const ShowDogDetails = () => {
  const [dog, setDog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    DogService.getDog(id).then((res) => setDog(res.data))
      .catch((err) => console.log("error form get dog details"));
  }, [id])
  const onDelete = (id) => {
    DogService.deleteDog(id).then((res) => navigate('/user'))
      .catch((err) => console.log("error form get delte dogs"));
  }
  const onUpdate = (id) => {
    navigate('/update-dog/' + id)
  }
  const dogPic = <DogCard dog={dog} />
  return (
    <div>
      <table className='table'>
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
      {/* <div className='dog-actions'>
        <button className="btn btn-danger" onClick={() => { onDelete(dog._id) }}>Delete</button>

        <button className='btn btn-primary' onClick={() => { onUpdate(dog._id) }}>Edit</button>
      </div> */}
    </div>
  )
}

export default ShowDogDetails;