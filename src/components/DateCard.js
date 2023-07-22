// import React from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { loadScript } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
const libraries = ["places"];



const DateCard = (props) => {
  const dog = props.dog;
  const newDate = new Date(dog.dateAndTime)
  const matchedYr = newDate.getFullYear();
  const matchedMo = newDate.getMonth() + 1;
  const dayMatched = newDate.getDate();
  const [locationCenter, setLocationCenter] = useState(null);



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.AIzaSyCeT8OkreuqLK67q6U1m5FEcHUZl2I3bU8,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  // useEffect(() => {
  //   // Fetch location coordinates using Google Maps Geocoding API
  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ address: dog.location }, (results, status) => {
  //     if (status === "OK" && results && results[0]) {
  //       // console.log(results[0].geometry.location)
  //       const { lat, lng } = results[0].geometry.location;
  //       setLocationCenter({ lat, lng });
        
  //     }
  //   });
  // }, [dog.location]);

  // const MapWithLocation = ({ center }) => {
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "AIzaSyCeT8OkreuqLK67q6U1m5FEcHUZl2I3bU8",
  //     libraries,
  //   });



  //   return (
  //     <div className="MapSample">
  //       {!isLoaded ? (
  //         <h1>Loading...</h1>
  //       ) : (
  //         <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
  //           {/* Add markers or other map components if needed */}
  //         </GoogleMap>
  //       )}
  //     </div>

  //     // <div className="card">
  //     //   {/* Other components */}
  //     //   <MapWithLocation center={locationCenter} />
  //     //   {/* Other components */}
  //     // </div>

  //   );
  // };

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

        <div className="MapSample">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
            />
          )}
        </div>

    

      </div>

    </div>
  );
}

export default DateCard;