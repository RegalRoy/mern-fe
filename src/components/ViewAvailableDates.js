
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import AuthService from "../services/auth.service";
import DogService from "../services/dog.service";

const GetDate = () => {
    const [content, setContent] = useState([]);
    const [matchedDates, setMatchDates] = useState([])
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
        // UserService.GetDate().then(
        //     (response) => {
        //         setContent(response.data);
        //         // console.log(content)
        //     },
        //     (error) => {
        //         const _content =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();

        //         setContent(_content);
        //     }
        // );
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

            console.log("no of dogs of the owner " + dogsOfOwners.length)
            dogsOfOwners.map(dog=>console.log(dog))
            dogsOfOwners.map(dog => {
                UserService.GetDate().then((re) => {
                    let allDates = [];
                    allDates = re.data;
                    console.log("Len of date array is "+allDates.length)
                    allDates.map(date=>console.log(date));
                    allDates.map(date => {
                        if (date.dogRestrictions.includes(dog.dogBreed) && date.dogRestrictions.includes(dog.dogSize) && date.dogRestrictions.includes(dog.dogTemperament)) {
                            let datematchedArr=[];
                            datematchedArr.push(date);
                            setMatchDates(datematchedArr);
                            console.log("date to be se is " + date.dateAndTime)
                            return;
                        } else {
                            setContent([])
                            console.log("no dates match")
                        }
                    })
                })
            })

        })
    }


    const dateList = matchedDates.map((dog, k) => <DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants} />)

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Your date List</h3>
                <div className='list'>{dateList}</div>

            </header>
        </div>
    )
}

export default GetDate;