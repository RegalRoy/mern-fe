
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import DogService from "../services/dog.service";
import UserService from '../services/user.service';

const ViewDate = () => {
  const [date, setDate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    UserService.ViewDate(id).then((res) => setDate(res.data))
      .catch((err) => console.log("error form get date details"));
  }, { id });
  const removeDate = (id) => {
    UserService.DeleteDate(id);
  }
  const updateDate = (id) => {
    navigate('/update-date/' + id)
  }
  return (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>dateAndTime</td>
            <td>{date.dateAndTime}</td>
            
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>participants</td>
            {/* <td>{date.participants}</td> */}
            {/* <td>{date.participants.map(e=>e)}</td> */}

            <td>
              {Array.isArray(date.participants) ? (
                date.participants.map((e) => e + ' ')
              ) : (
                <span>{date.participants}</span>
              )}
            </td>


          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>dogRestrictions</td>
            {/* <td>{date.dogRestrictions}</td> */}
            {/* {date.dogRestrictions.map(e=><tr><td>{e}</td></tr>)} */}
            {/* {date.dogRestrictions.map(e=><td>{e}</td>)} */}
            {/* <td>{date.dogRestrictions.map(e=> e+"  ")}</td> */}

            <td>
              {Array.isArray(date.dogRestrictions) ? (
                date.dogRestrictions.map((e) => e + '  ')
              ) : (
                <span>{date.dogRestrictions}</span>
              )}
            </td>


          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>location</td>
            <td>{date.location}</td>
          </tr>


        </tbody>
      </table>
      <div className='dog-actions'>
        <button className="btn btn-outline-danger btn-lg btn-block" onClick={() => removeDate(id)}>Delete</button>

        <button className='btn btn-outline-info btn-lg btn-block' onClick={() => updateDate(id)}>Edit</button>
      </div>
    </div>
  )
}

export default ViewDate;


/**
 * The error occurs because when you use <td>{date.participants}</td> and <td>{date.dogRestrictions}</td>, you are trying to render an array directly inside a JSX element, which is not allowed. JSX expects a single value or a valid React component as its children, not an array.

When you use Array.isArray(date.dogRestrictions) ? date.dogRestrictions.map((e) => e + ' ') : <span>{date.dogRestrictions}</span> and Array.isArray(date.participants) ? date.participants.map((e) => e + ' ') : <span>{date.participants}</span>, you are conditionally rendering the array values using .map() only when they are actually arrays. In the case where they are not arrays, you render a single value wrapped inside a <span>, which is a valid JSX element.

So, by using conditional rendering with .map() inside the ternary operator, you handle both cases correctly: rendering arrays using .map() and rendering single values with <span>, preventing the error during the initial render.
 */