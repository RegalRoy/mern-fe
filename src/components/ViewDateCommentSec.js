
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import DogService from "../services/dog.service";
import UserService from '../services/user.service';
import AuthService from "../services/auth.service";
import DateCard from './DateCardMaps';
import Alert from 'react-bootstrap/Alert';

const ViewDate = () => {
  const [date, setDate] = useState({});
  const [showSuccessBanner, setShowSuccessBanner] = useState(false); // State variable for success banner

  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    UserService.ViewDate(id).then((res) => { setDate(res.data) })
      .catch((err) => console.log("error form get date details"));
  }, { id });
  const removeDate = (id) => {
    UserService.DeleteDate(id).then(r => {
      setShowSuccessBanner(true); // Show success banner after form submission
      setTimeout(() => {
        setShowSuccessBanner(false); navigate('/getDate') // Hide the success banner after a few seconds (adjust timing as needed)
      }, 5000);
    });
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
    const timestamp = new Date();

    updatedDate.comments = [
      ...updatedDate.comments,
      { currentUser: currentUser.username, comments: userComment, timeofcomment: timestamp }
    ];
    // Update the state with the new 'updatedDate'
    setDate(updatedDate);
    // Save the updated data using the service method (assuming this persists the changes)
    UserService.EditDate(id, updatedDate);
    console.log(date)
  };

  const registerToPlaydate = (id) => {
    let pickedDate
    UserService.ViewDate(id).then((r) => {
      pickedDate = r.data;
      if (pickedDate.participants.includes(currentUser.username)) {

      } else {
        pickedDate.participants.push(currentUser.username);
        UserService.EditDate(id, pickedDate);
      }


    })
  }

  const UnregisterToPlaydate = (id) => {
    let pickedDate2
    UserService.ViewDate(id).then((r) => {
      pickedDate2 = r.data;
      let newArr = pickedDate2.participants.filter(e => e !== currentUser.username);
      pickedDate2.participants = newArr;
      UserService.EditDate(id, pickedDate2);

    })
  }




  const rating = (e) => {
    console.log('rating is clicked');
    const rating = parseInt(e.target.value);
    console.log(rating);
    const updatedDate = { ...date };
    console.log(updatedDate);

    let currentUserFound = false;

    updatedDate.rating.map(r => {
      if (r.currentUser === currentUser.username) {
        r.rate = rating;
        currentUserFound = true;
      }
    });

    if (!currentUserFound) {
      updatedDate.rating.push({ currentUser: currentUser.username, rate: rating });
    }

    console.log(updatedDate);

    // Now you can use the 'updatedDate' object as needed:
    setDate(updatedDate);
    UserService.EditDate(id, updatedDate);
  }


  return (
    <div className='container bg-white'>
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
        {/* date card map here */}
        <div>
          {/* ... (your existing code) ... */}
          {date.participants && (
            <DateCard
              dog={date}
              participants={date.participants}
              registerToPlaydate={registerToPlaydate}
              UnregisterToPlaydate={UnregisterToPlaydate}
            />
          )}
          {/* ... (your existing code) ... */}
        </div>
      </div>
      {/* comment section start */}

      <div class="container">
        <div class="be-comment-block">
          <h1 class="comments-title">{Array.isArray(date.comments) ? "No of Comments :" + date.comments.length : 1}</h1>
          {/* Loop Here */}

          <div>
            {Array.isArray(date.comments) ? (
              date.comments.map((e) => (
                <div class="be-comment">
                  <div class="be-img-comment">
                    <a href="blog-detail-2.html">
                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="be-ava-comment" />
                    </a>
                  </div>
                  <div class="be-comment-content">

                    <span class="be-comment-name">
                      <a href="blog-detail-2.html"> {e.currentUser}</a>
                    </span>
                    <span class="be-comment-time">
                      <i class="fa fa-clock-o"></i>
                      {new Date(e.timeofcomment).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>

                    <p class="be-comment-text">
                      {e.comments}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <span>{date.comments}</span>
            )}
          </div>






        </div>
      </div>

      {/* comment section end */}

      {date.ownerId === currentUser.id ?
        <div className='dog-actions'>
          <button className="btn btn-danger" onClick={() => removeDate(id)}>Delete</button>

          <button className='btn btn-primary' onClick={() => updateDate(id)}>Edit</button>
        </div> : <p></p>

      }

      {
        Array.isArray(date.participants) ? date.participants.includes(currentUser.username) ?
          <div >
            <h4>Rate this date!</h4>
            <div className="rate" style={{ float: "left" }}>
              <input type="radio" id="star5" name="rate" value="5" onClick={(event) => rating(event)} />
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value="4" onClick={(event) => rating(event)} />
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value="3" onClick={(event) => rating(event)} />
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value="2" onClick={(event) => rating(event)} />
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value="1" onClick={(event) => rating(event)} />
              <label for="star1" title="text">1 star</label>
            </div>
          </div>
          : "Cannot Rate, Need to register for this date ..."
          : "cannot"
      }

      {
        Array.isArray(date.participants) ? date.participants.includes(currentUser.username) ?
          <div>

            <form className='container' style={{ float: "left" }}>
              <textarea name='dateComment' id='dateComment' rows="5"></textarea>

            </form>
            <button className='btn btn-primary' type="button" onClick={(e) => handleComment(e)}>POST Comment</button>

          </div> : <div>You need to be registered to   comment on this date </div> : <div>  no comment outer </div>
      }

      <div style={{ paddingTop: 10 }}>
        {showSuccessBanner && (
          <Alert variant="success" >
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep things
              nice and tidy.
            </p>
          </Alert>
        )}
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