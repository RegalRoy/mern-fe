import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service"
import { useEffect, useState } from "react";
import UserService from "../services/user.service";

const EditDate = () => {
    // const currentUser = AuthService.getCurrentUser();
    const { id } = useParams();
    // const navigate = useNavigate();
    // const [date, setDate] = useState({
    //     dateAndTime: "",
    //     participants: [],
    //     dogRestrictions: [],
    //     location: "",
    //     ownerId: currentUser.id
    // })

    // useEffect(() => { UserService.ViewDate(id).then((res) => setDate(res.data)) }, { id })

    // const onChange = (e) => {
    //     const { name, value } = e.target;

    //     if (name === "participants" || name === "dogRestrictions") {
    //         const arrayValue = value.split(",").map((item) => item.trim());
    //         setDate((prevDate) => ({ ...prevDate, [name]: arrayValue }));
    //     } else {
    //         setDate((prevDate) => ({ ...prevDate, [name]: value }));
    //     }
    // }

    // const handleChangeDate = (e) => {
    //     e.preventDefault();
    //     UserService.EditDate(id, date); navigate('/getDate');
    // }

    // return (
    //     <div>
    //         <form onSubmit={handleChangeDate}>
    //             <div className="form-group">
    //                 <label htmlFor="username">Date and Time</label>
    //                 {/* <input
    //                     type="text"
    //                     className="form-control"
    //                     name="dateAndTime"
    //                     value={date.dateAndTime}
    //                     onChange={onChange}
    //                 /> */}

    //                 <input type="datetime-local" id="dateAndTime" name="dateAndTime"  value={date.dateAndTime} onChange={onChange} />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="username">participants</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     name="participants"
    //                     value={date.participants}
    //                     onChange={onChange}
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="username">dogRestrictions</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     name="dogRestrictions"
    //                     value={date.dogRestrictions}
    //                     onChange={onChange}
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="username">location</label>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     name="location"
    //                     value={date.location}
    //                     onChange={onChange}
    //                 />
    //             </div>


    //             <input
    //                 type='submit'
    //                 className='btn btn-outline-warning btn-block mt-4'
    //             />
    //         </form>
    //     </div>
    // )


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
            UserService.EditDate(id, Date); navigate('/getDate');
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
        <div>
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


                    <select name="dogBreed[]" id="dogBreed" multiple >
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
                <button type="button" onClick={(e) => handleCreateDate(e)}>SEND</button>

            </form>
        </div>
    )


}


export default EditDate