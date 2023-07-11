
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DateCard from "./DateCard";
import AuthService from "../services/auth.service";

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

    const dateListForOwners = content.filter(date=>date.ownerId==currentUser.id)
    const dateList = dateListForOwners.map((dog ,k) => <DateCard dog={dog} key={k}/>)

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