import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service"
import { useEffect, useState } from "react";
import UserService from "../services/user.service";

const EditDate = () => {
    const currentUser = AuthService.getCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState({
        dateAndTime: "",
        participants: [],
        dogRestrictions: [],
        location: "",
        ownerId: currentUser.id
    })

    useEffect(()=>{UserService.ViewDate(id).then((res)=>setDate(res.data))},{id})

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "participants" || name === "dogRestrictions") {
            const arrayValue = value.split(",").map((item) => item.trim());
            setDate((prevDate) => ({ ...prevDate, [name]: arrayValue }));
        } else {
            setDate((prevDate) => ({ ...prevDate, [name]: value }));
        }
    }

    const handleChangeDate = (e) => {
        e.preventDefault();
        UserService.EditDate(id, date); navigate('/getDate');
    }

    return (
        <div>
            <form onSubmit={handleChangeDate}>
                <div className="form-group">
                    <label htmlFor="username">Date and Time</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dateAndTime"
                        value={date.dateAndTime}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">participants</label>
                    <input
                        type="text"
                        className="form-control"
                        name="participants"
                        value={date.participants}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">dogRestrictions</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dogRestrictions"
                        value={date.dogRestrictions}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={date.location}
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


export default EditDate