
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import DateCardMaps from './DateCardMaps'
import AuthService from "../services/auth.service";
import DogService from "../services/dog.service";
import Calendar from './CalView';


const GetDate_ = (props) => {
    const [content, setContent] = useState([]);
    const [matchedDates, setMatchDates] = useState([])
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
        
            getMatchDate()
       
       
        
    }, [])

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

    const getMatchDate = () => {
        UserService.getUserBoard().then((r) => {
            let allDogs = [];
            let dogsOfOwners = [];
            allDogs = r.data;
            dogsOfOwners = allDogs.filter(dog => dog.ownerId == currentUser.id)

            // console.log("no of dogs of the owner " + dogsOfOwners.length)
            // dogsOfOwners.map(dog => console.log(dog))
            dogsOfOwners.map(dog => {
                UserService.GetDate().then((re) => {
                    let allDates = [];
                    let datematchedArr = [];
                    allDates = re.data;
                    // console.log("Len of date array is " + allDates.length)
                    // allDates.map(date => console.log(date));
                    allDates.map(date => {
                        if ((date.dogRestrictions.includes(dog.dogBreed) && date.dogRestrictions.includes(dog.dogSize) && date.dogRestrictions.includes(dog.dogTemperament)) || date.ownerId===currentUser.id) {

                            datematchedArr.push(date);
                            setMatchDates(datematchedArr);
                            // console.log("date to be se is " + date.dateAndTime)
                            return;
                        } else {
                            setContent([])
                            // console.log("no dates match")
                        }
                    })
                })
            })

        })
    }


    const dateList = matchedDates.map((dog, k) => <DateCardMaps dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />)

    return (
        <div className="container bg-white">
            <header className="jumbotron">
            <h1>Register your dog for playdates!</h1>
                <Calendar matchedDates={matchedDates} month={7} year={2023} />
                
                {/* <div className='list'>{dateList}</div> */}

            </header>
        </div>
    )
}

export default GetDate_;