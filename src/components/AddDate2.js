
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';
import React, { useState, useEffect } from "react";


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

    const [dateUpdated, setDateUpdated] = useState(false);


    useEffect(() => {
        if (dateUpdated) {
            UserService.AddDate(Date);
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
        </div>
    )
}

export default AddDate;