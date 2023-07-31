
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';
import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

const AddDate = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [Date, setDate] = useState({
        dateAndTime: "",
        participants: [],
        dogRestrictions: [],
        location: "",
        ownerId: currentUser.id,

    }
    )
    const [showSuccessBanner, setShowSuccessBanner] = useState(false); // State variable for success banner

    const [dateUpdated, setDateUpdated] = useState(false);


    useEffect(() => {
        if (dateUpdated) {
            UserService.AddDate(Date).then((res=>{
                setShowSuccessBanner(true); // Show success banner after form submission
                setTimeout(() => {
                    setShowSuccessBanner(false);navigate('/getDate') // Hide the success banner after a few seconds (adjust timing as needed)
                }, 5000);
            }));
            setDateUpdated(false);
        }
    }, [Date, dateUpdated]);

    const handleCreateDate = (e) => {
        e.preventDefault();
        const selectedDogBreeds = Array.from(document.querySelectorAll('#dogBreed option:checked')).map(option => option.value);
        const selectedDogSizes = Array.from(document.querySelectorAll('#dogSize option:checked')).map(option => option.value);
        const selectedDogTemperaments = Array.from(document.querySelectorAll('#dogTemperament option:checked')).map(option => option.value);

        const dateAndTime_ = document.querySelector("#dateAndTime").value
        const location_ = document.querySelector("#location").value

        var Restrictions_ = selectedDogBreeds.concat(selectedDogSizes, selectedDogTemperaments)

        setDate({
            dateAndTime: dateAndTime_,
            participants: [],
            dogRestrictions: Restrictions_,
            location: location_,
            ownerId: currentUser.id,

        })
        setDateUpdated(true);
    }


    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            <form >
                <div className="form-group">
                    <label htmlFor="dateAndTime">dateAndTime</label>
                    {/* <input
                        type="text"
                        className="form-control"
                        name="dateAndTime"
                        id="dateAndTime"
                    // onChange={onChange}
                    /> */}

                    <input type="datetime-local" id="dateAndTime" name="dateAndTime" />
                </div>




                <div className="form-group">

                    <label>Dog Restrictions</label>


                    <select name="dogBreed[]" id="dogBreed" multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Labrador">Labrador</option>
                        <option value="French Bulldog">French Bulldog</option>
                        <option value="English Bulldog">English Bulldog</option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Beagle">Beagle</option>
                        <option value="German Shepherd">German Shepherd</option>
                    </select>

                    <select name="dogSize[]" id="dogSize" multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Giant">Giant</option>

                    </select>

                    <select name="dogTemperament[]" id="dogTemperament" multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Assertive ">Assertive </option>
                        <option value="aggressive">aggressive</option>
                        <option value="neutral">neutral</option>
                        <option value="passive">passive</option>

                    </select>


                </div>



                <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"

                    />
                </div>

                {/* <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                /> */}
                <button type="button" className='btn btn-primary' onClick={(e) => handleCreateDate(e)}>SEND</button>

            </form>
            <div style={{paddingTop:10}}>
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

export default AddDate;