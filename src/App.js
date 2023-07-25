import logo from "./logo/snifferslogo-removebg-preview.png"
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import AuthService from "./services/auth.service";
import DogService from "./services/dog.service";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import Profile from "./components/profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Dog from "./components/Dog"
import ShowDogDetails from './components/ShowDogDetails';
import UpdateDogDetails from './components/UpdateDogDetails';
import AddDate from './components/AddDate';
import AddDate2 from './components/AddDate2'
import GetDate from './components/GetDate';
import ViewDate from './components/ViewDate'
import ViewDateCommentSec from './components/ViewDateCommentSec'
import EditDate from './components/EditDate'
import EditDate2 from './components/EditDate2'
import GetDateTest from './components/GetDateTest';
import ViewAvailableDates from './components/ViewAvailableDates'
import ViewAvailableDates2 from './components/ViewAvailableDates2'
// import { registerLicense } from '@syncfusion/ej2-base';
// registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxMYVF2R2FJeFRycF9FaEwgOX1dQl9hSXpTcEVmWn9feHVRQWY=');
// function App_backUp() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const addDog = () => {
    DogService.AddDogTest();
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} alt="logo" />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/addDog"} className="nav-link">
                Add Dog!
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addDate"} className="nav-link">
                Add a Playdate!
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/getDate"} className="nav-link">
                Your Playdate!
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/viewAvailableDates"} className="nav-link">
                Register for Playdate!
              </Link>
            </li>

          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/addDog" element={<Dog />} />
          <Route path="/viewDog/:id" element={<ShowDogDetails />} />
          <Route path='/update-dog/:id' element={<UpdateDogDetails />} />
          <Route path='/addDate' element={<AddDate2 />} />
          {/* <Route path='/getDate' element={<GetDate />} /> */}
          <Route path='/getDate' element={<GetDateTest />} />
          <Route path='/viewDate/:id' element={<ViewDateCommentSec />} />
          <Route path='/update-date/:id' element={<EditDate2 />} />
          <Route path='/viewAvailableDates' element={<ViewAvailableDates />} />
        </Routes>
      </div>
    </div>
  );
};



export default App;
