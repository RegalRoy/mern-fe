import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

import UserService from "../services/user.service";
import DogCard from "./DogCard";

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard().then(
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
  }, []);
  
  const dogListForOwners = content.filter(dog=>dog.ownerId==currentUser.id)
  const dogList = dogListForOwners.map((dog ,k) => <DogCard dog={dog} key={k}/>)
  
  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <header className="jumbotron">
        <h3>Your Dog List</h3>
        <div className='list'>{dogList}</div>
      </header>
    </div>
  );
};

export default BoardUser;