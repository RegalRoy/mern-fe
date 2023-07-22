import { Link } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
const libraries = ["places"];

const DateCard = (props) => {
  const dog = props.dog;
  const newDate = new Date(dog.dateAndTime)
  const matchedYr = newDate.getFullYear();
  const matchedMo = newDate.getMonth() + 1;
  const dayMatched = newDate.getDate();
  const [locationCenter, setLocationCenter] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeT8OkreuqLK67q6U1m5FEcHUZl2I3bU8", // Replace with your actual API key
    libraries,
  });

  useEffect(() => {
    // Fetch location coordinates using Google Maps Geocoding API
    if (isLoaded && !loadError && dog.location) { // Add a check for dog.location
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ "address": dog.location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          // const { lat, lng } = results[0].geometry.location;
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
         
          setLocationCenter({ lat, lng });
          
          
        } else {
          console.error("Geocoding API Error:", status);
        }
      });
    }
  }, [dog.location, isLoaded, loadError]);
  

  const MapWithLocation = ({ center_ }) => {
    console.log(center_)
    return (
      <div className="MapSample">
        
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap mapContainerClassName="map-container" center={center_} zoom={15}>
          
          {center_ && <Marker position={{ lat:center_.lat , lng: center_.lng }} />}

            
          </GoogleMap>
        )}
      </div>
    );
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className='card' >

    {/* <img
          src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
          alt='Books'
          height={200}
        /> */}
    <div className='desc'>
      <div className="buttonContainer">

        {/* <button onClick={()=>props.registerToPlaydate(dog._id)}>Register</button> */}
        <a href="#" className="btn btn-primary" onClick={() => props.registerToPlaydate(dog._id)}>Register</a>
        {/* <button onClick={()=>props.UnregisterToPlaydate(dog._id)}>UnRegister</button> */}
        <a href="#" className="btn btn-danger" onClick={() => props.UnregisterToPlaydate(dog._id)}>UnRegister</a>
      </div>
      <h2>
        <Link to={`/viewDate/${dog._id}`}>{dog._id}</Link>
      </h2>
      <h4>Date: </h4>
      <p>{matchedMo + " / " + dayMatched}</p>
      <h4>Location:</h4>
      <p>Location: {dog.location}</p>
      <h4>Participants</h4>
      <ul>
        {dog.participants.map(e => <li>{e}</li>)}
      </ul>

      <div className='card'>
      {/* Other components */}
      <MapWithLocation center_={locationCenter} />
      
      {/* Other components */}
    </div>

  

    </div>

  </div>
  );
}

export default DateCard;
