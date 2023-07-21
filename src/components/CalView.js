import React, { useEffect, useState } from 'react';
import DateCard from "./DateCard";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Calendar = ({ matchedDates, month, year }) => {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayMatchedDates, setDisplayDates] = useState([])
  const [location, setLocation] = useState([])
  const currentUser = AuthService.getCurrentUser();
  var _displayMatchedDates = []
  var __displayMatchedDates = []
  var dateLoc = [];
  const moveNext = () => {
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }

    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    setDisplayDates([])
  };

  const movePrev = () => {
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;

    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear--;
    }

    setCurrentMonth(prevMonth);
    setCurrentYear(prevYear);
    setDisplayDates([])

  };

  const getMonthName = (month) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[month - 1];
  };



  const handleDayClick2 = (event, day) => {
    const clickedDay = parseInt(event.target.innerText, 10); // Convert to a number
    console.log('Clicked Day:', clickedDay);
    console.log(currentMonth)
    console.log(currentYear)

    const newArr = matchedDates.filter(d => {
      const newDate = new Date(d.dateAndTime)
      const matchedYr = newDate.getFullYear();
      const matchedMo = newDate.getMonth() + 1;
      const dayMatched = newDate.getDate();
      // console.log(matchedYr + " "+currentYear)
      // console.log(matchedMo + " "+currentMonth)
      // console.log(dayMatched + " "+clickedDay)
      return dayMatched === clickedDay && matchedMo === currentMonth && matchedYr === currentYear;
    })

    console.log(newArr)
    setDisplayDates(newArr)
    setLocation([])
  };

  const handleLocClick = (event, day) => {
    const clickedLoc = event.target.innerText;
    dateLoc.push(clickedLoc);


    const newArr = __displayMatchedDates.filter(d => {
      const newDate = new Date(d.dateAndTime)
      const matchedYr = newDate.getFullYear();
      const matchedMo = newDate.getMonth() + 1;
      const dayMatched = newDate.getDate();
      const loc = d.location
      // console.log(matchedYr + " "+currentYear)
      // console.log(matchedMo + " "+currentMonth)
      // console.log(dayMatched + " "+clickedDay)
      return loc === clickedLoc;
    })
    setLocation(newArr)
    console.log(newArr)
    setDisplayDates([])
  }

  //getting the match dates' day, month and year

  const checkeMatchedDates = (x) => {
    return matchedDates.some(d => {
      const newDate = new Date(d.dateAndTime)
      const matchedYr = newDate.getFullYear();
      const matchedMo = newDate.getMonth() + 1;
      const dayMatched = newDate.getDate();
      return dayMatched === x && matchedMo === currentMonth && matchedYr === currentYear;
    });

  };


  const renderCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    let days = [];
    let day = 1;

    for (let i = 0; i < weeks; i++) {
      let weekDays = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          weekDays.push(<td key={j}></td>);
        } else if (day > daysInMonth) {
          break;
        } else {


          if (checkeMatchedDates(day)) {
            _displayMatchedDates = matchedDates.filter(d => {
              const newDate = new Date(d.dateAndTime)
              const matchedYr = newDate.getFullYear();
              const matchedMo = newDate.getMonth() + 1;
              const dayMatched = newDate.getDate();
              return dayMatched === day && matchedMo === currentMonth && matchedYr === currentYear;
            })

            __displayMatchedDates.push(..._displayMatchedDates)


            if (_displayMatchedDates[0].participants.includes(currentUser.username)) {
              weekDays.push(
                <td key={j} className='matchedAndReg' onClick={(event) => handleDayClick2(event, day)}>
                  {day}
                </td>
              );
            } else {
              weekDays.push(
                <td key={j} className='matched' onClick={(event) => handleDayClick2(event, day)}>
                  {day}
                </td>
              );
            }


          } else {
            weekDays.push(
              <td key={j} onClick={(event) => handleDayClick2(event, day)}>
                {day}
              </td>
            );
          }




          day++;
        }
      }

      days.push(<tr key={i} >{weekDays}</tr>);
    }
    return days;
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

  return (
    <div>
      <h2>
        {getMonthName(currentMonth)} {currentYear}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>

        <tbody>{renderCalendarDays()}</tbody>
      </table>
      <button onClick={movePrev}>Prev Month</button>
      <button onClick={moveNext}>Next Month</button>
      {/* {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString()}</p>} */}
      <br />
      <div>
        <h4>Locations of available dates: </h4>
        <ul>
          {__displayMatchedDates.map(d => <li onClick={(event) => handleLocClick(event)}>{d.location}</li>)}
        </ul>

      </div>
      {/* <div>
      {displayMatchedDates.map((dog, k) => (<DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />))}
      
      </div> */}
      <h3>Your date List</h3>
      {/* <div>
        {displayMatchedDates.length === 0 && location.length===0? 
        __displayMatchedDates.map((dog, k) => (<DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />))
        :!displayMatchedDates.length === 0 && location.length===0?
        displayMatchedDates.map((dog, k) => (<DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />))
        :displayMatchedDates.length === 0 && !location.length===0?
        location.map((dog, k) => (<DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />))
        : <h3>NO MATCH</h3>}
      </div> */}

      <div>
        {displayMatchedDates.length === 0 && location.length === 0
          ? __displayMatchedDates.map((dog, k) => (
            <DateCard
              dog={dog}
              key={k}
              registerToPlaydate={registerToPlaydate}
              UnregisterToPlaydate={UnregisterToPlaydate}
              participants={dog.participants}
            />
          ))
          : !(displayMatchedDates.length === 0) && location.length === 0
            ? displayMatchedDates.map((dog, k) => (
              <DateCard
                dog={dog}
                key={k}
                registerToPlaydate={registerToPlaydate}
                UnregisterToPlaydate={UnregisterToPlaydate}
                participants={dog.participants}
              />
            ))
            : displayMatchedDates.length === 0 && !(location.length === 0)
              ? location.map((dog, k) => (
                <DateCard
                  dog={dog}
                  key={k}
                  registerToPlaydate={registerToPlaydate}
                  UnregisterToPlaydate={UnregisterToPlaydate}
                  participants={dog.participants}
                />
              ))
              : <h3>NO MATCH</h3>}
      </div>




    </div>
  );
};

export default Calendar;
