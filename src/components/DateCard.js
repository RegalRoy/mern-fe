import React from 'react';
import {Link} from 'react-router-dom';
// import '../App.css';

const DateCard =(props)=>{
    const dog = props.dog;
    return (
        <div className='card-container'>
          
          {/* <img
            src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
            alt='Books'
            height={200}
          /> */}
          <div className='desc'>
         <button onClick={()=>props.registerToPlaydate(dog._id)}>Register</button>
         <button onClick={()=>props.UnregisterToPlaydate(dog._id)}>UnRegister</button>
            <h2>
              <Link to={`/viewDate/${dog._id}`}>{dog._id}</Link>
            </h2>
            <h3>{dog.dateAndTime}</h3>
            <p>{dog.location}</p>
            <h3>participants</h3>
            <ul>
              {dog.participants.map(e=><li>{e}</li>)}
            </ul>
          </div>
          
        </div>
      );
}

export default DateCard;