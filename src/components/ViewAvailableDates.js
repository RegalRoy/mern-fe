
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import AuthService from "../services/auth.service";
// import User from "../../../mern-be/app/models/user.model";

const GetDate=()=>{
    const [content, setContent] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
        UserService.GetDate().then(
          (response) => {
            setContent(response.data);
            console.log(content)
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setContent(_content);
          }
        );
      }, [])

    const registerToPlaydate =(id)=>{
        let pickedDate
        UserService.ViewDate(id).then((r)=>{
            pickedDate=r.data;
            if(pickedDate.participants.includes(currentUser.username)){

            }else{
                pickedDate.participants.push(currentUser.username);
                UserService.EditDate(id, pickedDate);
            }
           
            
        })
        // console.log(pickedDate);
    }

    const UnregisterToPlaydate =(id)=>{
        let pickedDate2
        UserService.ViewDate(id).then((r)=>{
            pickedDate2=r.data;
            let newArr = pickedDate2.participants.filter(e => e !== currentUser.username);
            pickedDate2.participants=newArr;
            UserService.EditDate(id, pickedDate2);
            
        })
    }

    // const dateListForOwners = content.filter(date=>date.ownerId==currentUser.id)
    const dateList = content.map((dog ,k) => <DateCard dog={dog} key={k} registerToPlaydate={registerToPlaydate} UnregisterToPlaydate={UnregisterToPlaydate} participants={dog.participants}/>)

    return(
        <div className="container">
      <header className="jumbotron">
        <h3>Your date List</h3>
        <div className='list'>{dateList}</div>
        
      </header>
    </div>
    )
}

export default GetDate;