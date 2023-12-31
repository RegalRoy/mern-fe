import { Link } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';
const libraries = ["places"];



const DateCard = (props) => {
  const dog = props.dog;
  const newDate = new Date(dog.dateAndTime)
  const matchedYr = newDate.getFullYear();
  const matchedMo = newDate.getMonth() + 1;
  const dayMatched = newDate.getDate();
  const [locationCenter, setLocationCenter] = useState(null);
  const [aveRating, setRating] = useState();
  const [datePics, setPlayDatePics] = useState([])
  const currentUser = AuthService.getCurrentUser();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeT8OkreuqLK67q6U1m5FEcHUZl2I3bU8", // Replace with your actual API key
    libraries,
  });
  const getdatePhoto = () => {
    try {
      UserService.GetPic(dog._id).then(r => {
        if (r.data) {
          setPlayDatePics(r.data.photo)
        }

      })
    } catch (e) {
      console.log(e)
    }
  }
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
          const averageRating = calculateAverageRating(dog.rating);
          console.log("average rating is " + averageRating)
          setRating(averageRating);
          console.log("updated ave rating is " + aveRating)
        } else {
          console.error("Geocoding API Error:", status);
        }
      });
    };
    getdatePhoto();
  }, [dog.location, isLoaded, loadError]);


  const MapWithLocation = ({ center_ }) => {
    console.log(center_)
    return (
      <div className="MapSample">

        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap mapContainerClassName="map-container" center={center_} zoom={12}>

            {center_ && <Marker position={{ lat: center_.lat, lng: center_.lng }} />}


          </GoogleMap>
        )}
      </div>
    );
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  function calculateAverageRating(ratings) {
    let sum = 0;
    let count = 0;
    ratings.map(rating => { sum = sum + rating.rate; count++ })
    console.log('average from function is ' + (sum / count))
    return sum / count;
  }

  return (
    <div className='card-container container bg-grey' >


      <div className='desc'>
        <div>
          <h4>Rating:</h4>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`fa fa-star ${i < aveRating ? "checked" : ""}`}></span>
          ))}
        <b>  ({dog.rating.length})</b>
        </div>
        <div>
          <h4>Comment Thread:</h4><b> {dog.comments.length}</b> total comments
        </div>
        <div>
          <h4>Photo Uploads:</h4><b> {datePics.length}</b> total photos
        </div>
        <div className="buttonContainer">
          {/* {dog.participants.includes(currentUser.username) ? <a href="#" className="btn btn-danger" onClick={() => props.UnregisterToPlaydate(dog._id)}>UnRegister</a> : <a href="#" className="btn btn-primary" onClick={() => props.registerToPlaydate(dog._id)}>Register</a>} */}

          {dog.ownerId === currentUser.id ? (
            <a href="#" className="btn btn-dangerOwner">
              You Own This Date
            </a>
          ) : dog.participants.includes(currentUser.username) ? (
            <a href="#" className="btn btn-danger" onClick={() => props.UnregisterToPlaydate(dog._id)}>
              UnRegister
            </a>
          ) : (
            <a href="#" className="btn btn-primary" onClick={() => props.registerToPlaydate(dog._id)}>
              Register
            </a>
          )}


        </div>
        <h5>
          <Link to={`/viewDate/${dog._id}`}>{dog._id}</Link>
        </h5>
        <h4>Date: </h4>
        <p>{matchedMo + " / " + dayMatched}</p>
        <h4>Location:</h4>
        <p>{dog.location}</p>


        <div className='card'>
          {/* Other components */}
          <MapWithLocation center_={locationCenter} />

          {/* Other components */}
        </div>
        <h4>Participants</h4>
        <ul>
          {dog.participants.map(e => <li>{e}</li>)}
        </ul>


      </div>



    </div>
  );
}

export default DateCard;
