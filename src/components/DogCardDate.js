import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


// import '../App.css';

const DogCard = (props) => {
  const [photoUrl, setPhotoUrl] = useState();
  const playDatePic = props.playDatePic
  const backendBaseUrl = "http://localhost:8080/date_uploads/"; // Replace with your actual backend URL
  useEffect(() => {
    let urlArr = ""
    if (playDatePic) {


      urlArr = backendBaseUrl + playDatePic.split('\\').pop();


    }

    setPhotoUrl(urlArr);

  }, [playDatePic])

  return (
    // {Array.isArray(photoUrl) ?photoUrl.map(url=>{
    //   return <div className='card' style={{ width: '100%' }}>
    //   <img src={url} alt="Dog Photo" /></div>
    //  })}
    <div className='' style={{ width: '100%' , height:'100%'}}>
      {photoUrl && 
        <img src={photoUrl} alt="Dog Photo" style={{ width: '425px' , height:'425px'}}/>} 
  
    </div>

  );
}

export default DogCard;