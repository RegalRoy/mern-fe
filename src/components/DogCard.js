import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


// import '../App.css';

const DogCard =(props)=>{
  const [photoUrl, setPhotoUrl] = useState("");
  const dog = props.dog;
  const backendBaseUrl = "http://localhost:8080/uploads/"; // Replace with your actual backend URL
  useEffect(()=>{
    const filePath = dog.photo;
    console.log(filePath)
    const filename = filePath.split('\\').pop();
    setPhotoUrl(backendBaseUrl+filename);
    // console.log("poto is .. ")
    // console.log(dog.photo)
    // photoUrl && console.log(photoUrl)
    // console.log(dog)
  }, [dog.photo])
  
    return (
        <div className='card' style={{ width: '50rem' }}>
          
          {photoUrl && <img src={photoUrl} alt="Dog Photo" />}
          {/* <img src='http://localhost:8080/uploads/dog.png' ></img> */}

          <div className='desc'>
            <h5>
              <Link to={`/viewDog/${dog._id}`}>{dog.dogName}</Link>
            </h5>
            {/* <h3>Breed: {dog.dogBreed}</h3>
            <p>Size: {dog.dogSize}</p> */}
          </div>
        </div>
      );
}

export default DogCard;