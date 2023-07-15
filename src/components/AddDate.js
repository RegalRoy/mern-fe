
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
        dogBreed:[],
        dogSize:[],
        dogTemperament:[]
    }
    )

    // const onChange = (e) => {
    //     const { name, value } = e.target;

    //     if (name === "participants" || name === "dogRestrictions") {
    //         const arrayValue = value.split(",").map((item) => item.trim());
    //         setDate((prevDate) => ({ ...prevDate, [name]: arrayValue }));
    //     } else {
    //         setDate((prevDate) => ({ ...prevDate, [name]: value }));
    //     }
    // };

    // const onChange = (e) => {
    //     const { name, options } = e.target;
    //     const selectedValues = Array.from(options)
    //       .filter(option => option.selected)
    //       .map(option => option.value);
      
    //     setDate(prevDate => ({
    //       ...prevDate,
    //       [name]: selectedValues
    //     }));
    //   };
      

    const onChange = (e) => {
        setDate({ ...Date, [e.target.name]: e.target.value })
    }

    const handleCreateDate = (e) => {
        e.preventDefault();
        console.log(Date)
        // Date.dogRestrictions.push(Date.dogBreed,Date.dogSize,Date.dogTemperament)
        // UserService.AddDate(Date)
        //     .then((res) => {
        //         setDate({
        //             dateAndTime: "",
        //             participants: [],
        //             dogRestrictions: [],
        //             location: "",
        //         });
        //         navigate('/user')
        //     })
    }
    return (
        <div>
            <form onSubmit={handleCreateDate}>
                <div className="form-group">
                    <label htmlFor="username">dateAndTime</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dateAndTime"
                        onChange={onChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="username">participants</label>
                    <input
                        type="text"
                        className="form-control"
                        name="participants"
                        value={Date.participants.join(", ")}
                        onChange={onChange}
                    />
                </div> */}



                <div className="form-group">
                    <label htmlFor="username">dogRestrictions</label>
                    {/* <input
                        type="text"
                        className="form-control"
                        name="dogRestrictions"
                        value={Date.dogRestrictions.join(", ")}

                        onChange={onChange}
                    /> */}

                    <select name="dogBreed" id="pet-select" onChange={onChange} multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Labrador">Labrador</option>
                        <option value="French Bulldog">French Bulldog</option>
                        <option value="English Bulldog">English Bulldog</option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Beagle">Beagle</option>
                        <option value="German Shepherd">German Shepherd</option>
                    </select>

                    <select name="dogSize" id="pet-select" onChange={onChange} multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Giant">Giant</option>

                    </select>

                    <select name="dogTemperament" id="pet-select" onChange={onChange} multiple>
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="Assertive ">Assertive </option>
                        <option value="aggressive">aggressive</option>
                        <option value="neutral">neutral</option>
                        <option value="passive">passive</option>

                    </select>


                </div>



                <div className="form-group">
                    <label htmlFor="username">location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        onChange={onChange}
                    />
                </div>

                <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                />
            </form>
        </div>
    )
}

export default AddDate;