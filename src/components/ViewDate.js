
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import DogService from "../services/dog.service";
import UserService from '../services/user.service';
import AuthService from "../services/auth.service";

const ViewDate = () => {
  const [date, setDate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
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
 


  const handleComment = (e) => {
    e.preventDefault();
    const userComment = document.getElementById('dateComment').value;
    // Create a copy of the 'date' object
    const updatedDate = { ...date };
    // Create a new 'comments' array with the updated comment
    updatedDate.comments = [
      ...updatedDate.comments,
      { currentUser: currentUser.username, comments: userComment }
    ];
    // Update the state with the new 'updatedDate'
    setDate(updatedDate);
    // Save the updated data using the service method (assuming this persists the changes)
    UserService.EditDate(id, updatedDate);
  };
  return (
    <div>
      <table className='table'>
        <tbody>
          <tr>
            {/* <th scope='row'>1</th> */}
            <td>dateAndTime</td>
            <td>{date.dateAndTime}</td>

          </tr>
          <tr>
            {/* <th scope='row'>2</th> */}
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
            {/* <th scope='row'>3</th> */}
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
            {/* <th scope='row'>4</th> */}
            <td>location</td>
            <td>{date.location}</td>
          </tr>


        </tbody>
      </table>
      <div>
        <h3> Comment Section</h3>
       
        <div>
          {Array.isArray(date.comments) ? (
            date.comments.map((e) => (
              <div key={e.currentUser}>
                {e.currentUser} says {e.comments}
              </div>
            ))
          ) : (
            <span>{date.comments}</span>
          )}
        </div>
      </div>
      {date.ownerId === currentUser.id ?
        <div className='dog-actions'>
          <button className="btn btn-danger" onClick={() => removeDate(id)}>Delete</button>

          <button className='btn btn-primary' onClick={() => updateDate(id)}>Edit</button>
        </div> : <p></p>

      }
      {
        Array.isArray(date.participants) ? date.participants.includes(currentUser.username) ?
          <div>

            <form>
              <input name='dateComment' id='dateComment'></input>
              <button className='btn btn-primary' type="button" onClick={(e) => handleComment(e)}>POST Comment</button>
            </form>

          </div> : <div>You need to be registered to   comment on this date </div> : <div>  no comment outer </div>
      }

    </div>
  )
}

export default ViewDate;


/**
 * The error occurs because when you use <td>{date.participants}</td> and <td>{date.dogRestrictions}</td>, you are trying to render an array directly inside a JSX element, which is not allowed. JSX expects a single value or a valid React component as its children, not an array.

When you use Array.isArray(date.dogRestrictions) ? date.dogRestrictions.map((e) => e + ' ') : <span>{date.dogRestrictions}</span> and Array.isArray(date.participants) ? date.participants.map((e) => e + ' ') : <span>{date.participants}</span>, you are conditionally rendering the array values using .map() only when they are actually arrays. In the case where they are not arrays, you render a single value wrapped inside a <span>, which is a valid JSX element.

So, by using conditional rendering with .map() inside the ternary operator, you handle both cases correctly: rendering arrays using .map() and rendering single values with <span>, preventing the error during the initial render.
 */