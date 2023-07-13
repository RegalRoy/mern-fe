
// import React, { useState, useEffect } from "react";
// import UserService from "../services/user.service";
// import DateCard from "./DateCard";
// import AuthService from "../services/auth.service";

// const GetDate=()=>{
//     const [content, setContent] = useState([]);
//     const currentUser = AuthService.getCurrentUser();
//     useEffect(() => {
//         UserService.GetDate().then(
//           (response) => {
//             setContent(response.data);
//             console.log(content)
//           },
//           (error) => {
//             const _content =
//               (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();
    
//             setContent(_content);
//           }
//         );
//       }, [])

//     const dateListForOwners = content.filter(date=>date.ownerId==currentUser.id)
//     const dateList = dateListForOwners.map((dog ,k) => <DateCard dog={dog} key={k}/>)

//     return(
//         <div className="container">
//       <header className="jumbotron">
//         <h3>Your date List</h3>
//         <div className='list'>{dateList}</div>
//       </header>
//     </div>
//     )
// }

// export default GetDate;




import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import AuthService from "../services/auth.service";
import Calendar from "react-calendar"; // Import the calendar library
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

const GetDate = () => {
  const [content, setContent] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the selected date
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.GetDate()
      .then((response) => {
        setContent(response.data);
        console.log(content);
      })
      .catch((error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  const filteredDates = content.filter(
    (date) => date.ownerId === currentUser.id
  );

  const dateList = filteredDates.map((dog, k) => (
    <DateCard dog={dog} key={k} />
  ));

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Your Date List</h3>
        <div className="calendar">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="list">{dateList}</div>
      </header>
    </div>
  );
};

export default GetDate;
