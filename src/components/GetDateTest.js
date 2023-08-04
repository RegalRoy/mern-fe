


import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import AuthService from "../services/auth.service";
import Calendar from "react-calendar"; // Import the calendar library
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import DateCardMaps from './DateCardMaps'
import CalendarView from './CalView';

const GetDate = () => {
  const [content, setContent] = useState([]);
  const [content_, setContent_] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the selected date
  const currentUser = AuthService.getCurrentUser();
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
    // console.log(pickedDate);
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
  useEffect(() => {
    UserService.GetDate()
      .then((response) => {
        setContent(response.data);
      const  filteredDates = response.data.filter(
          (date) => date.ownerId === currentUser.id
        );
        setContent_(filteredDates)
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
    <DateCardMaps dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />
  ));
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  console.log("current month is " + currentMonth)
  const cal = <CalendarView matchedDates={content_} month={currentMonth+1} year={2023} />

  return (
    <div className="container bg-white">
      <header className="jumbotron">
        <h1>Viewing Your Created Playdates!</h1>
        <div >
          {(cal) ? cal : ""}
        </div>
        {/* <div className="list">{dateList}</div> */}
      </header>
    </div>
  );
};

export default GetDate;
