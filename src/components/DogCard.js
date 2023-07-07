import React from 'react';
import {Link} from 'react-router-dom';
// import '../App.css';

const DogCard =(props)=>{
    const dog = props.dog;
    return (
        <div className='card-container'>
          
          <img
            src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
            alt='Books'
            height={200}
          />
          <div className='desc'>
            <h2>
              <Link to={`/viewDog/${dog._id}`}>{dog.dogName}</Link>
            </h2>
            <h3>{dog.dogBreed}</h3>
            <p>{dog.dogBreed}</p>
          </div>
        </div>
      );
}

export default DogCard;