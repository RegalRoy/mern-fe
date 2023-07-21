import React from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';

const DateCard = (props) => {
  const dog = props.dog;
  const newDate = new Date(dog.dateAndTime)
  const matchedYr = newDate.getFullYear();
  const matchedMo = newDate.getMonth() + 1;
  const dayMatched = newDate.getDate();

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
          <a href="#" class="btn btn-primary" onClick={() => props.registerToPlaydate(dog._id)}>Register</a>
          {/* <button onClick={()=>props.UnregisterToPlaydate(dog._id)}>UnRegister</button> */}
          <a href="#" class="btn btn-danger" onClick={() => props.UnregisterToPlaydate(dog._id)}>UnRegister</a>
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
      </div>

    </div>
  );
}

export default DateCard;