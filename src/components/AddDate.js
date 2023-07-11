
import {useNavigate} from 'react-router-dom';
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';
import React, { useState, useEffect } from "react";


const AddDate = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const[Date, setDate] = useState({
        dateAndTime:"",
        participants:[],
        dogRestrictions:[],
        location:"",
        ownerId:currentUser.id
    }
    )

    const onChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "participants" || name === "dogRestrictions") {
          const arrayValue = value.split(",").map((item) => item.trim());
          setDate((prevDate) => ({ ...prevDate, [name]: arrayValue }));
        } else {
          setDate((prevDate) => ({ ...prevDate, [name]: value }));
        }
      };

    const handleCreateDate = (e) =>{
        e.preventDefault();
        UserService.AddDate(Date)
        .then((res)=>{
            setDate({
                dateAndTime:"",
                participants:[],
                dogRestrictions:[],
                location:"",
            });
            navigate('/user')
        })
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
                <div className="form-group">
                    <label htmlFor="username">participants</label>
                    <input
                        type="text"
                        className="form-control"
                        name="participants"
                        value={Date.participants.join(", ")}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">dogRestrictions</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dogRestrictions"
                        value={Date.dogRestrictions.join(", ")}

                        onChange={onChange}
                    />
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