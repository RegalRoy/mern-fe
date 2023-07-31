// import logo from "./logo/snifferslogo-removebg-preview.png"
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import { Dropdown } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from './logo/group.png'

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
    <div >
      <div className="nav-container">
        <Navbar bg="dark" data-bs-theme="dark" className="">
          <Container>
            {/* {currentUser && (
              // <Navbar.Brand href="/home">Play Date Finder</Navbar.Brand>
              <img src={logo} style={{ width: '20%', height: 'auto' }}></img>
            )} */}
            {/* <Navbar.Brand href="/home">Play Date Finder</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Navbar.Brand href="#home">

                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>

                </Navbar.Brand>




                {currentUser && (
                 
                  <Nav.Link href="#link">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        Signed in as {currentUser.username}
                      </Link>
                    </li>
                   
                  </Nav.Link>

                 

                )}


                {currentUser ? (
                  <div className="navbar-nav ml-auto">


                    <Nav.Link href="#link">
                      <NavDropdown title="Dog Options" id="basic-nav-dropdown">

                        {/* <NavDropdown.Item href="#action/3.1"> <Link to={"/addDog"} className="">
                        Add Dog!
                      </Link>
                      </NavDropdown.Item> */}

                        <Nav.Item>
                          <Nav.Link href="/addDog">Add Dog</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link href="/user"> Your Dog List</Nav.Link>
                        </Nav.Item>

                        {/* <NavDropdown.Item href="#action/3.1"> <Link to={"/user"} className="">
                        Your Dog List
                      </Link>
                      </NavDropdown.Item> */}


                      </NavDropdown>
                    </Nav.Link>

                    <Nav.Link href="#link">
                      <NavDropdown title="PLayDaate Options" id="basic-nav-dropdown">

                        {/* <NavDropdown.Item href="#action/3.1"> <Link to={"/addDate"} className="">
                        Add a Playdate!
                      </Link>
                      </NavDropdown.Item> */}

                        <Nav.Item>
                          <Nav.Link href="/addDate">  Add a Playdate!</Nav.Link>
                        </Nav.Item>

                        {/* <NavDropdown.Item href="#action/3.1">   <Link to={"/getDate"} className="">
                        Your Playdate!
                      </Link>
                      </NavDropdown.Item> */}

                        <Nav.Item>
                          <Nav.Link href="/getDate"> Created Playdate!</Nav.Link>
                        </Nav.Item>

                        {/* <NavDropdown.Item href="#action/3.1">   <Link to={"/viewAvailableDates"} className="">
                        Register for Playdate!
                      </Link>
                      </NavDropdown.Item> */}

                        <Nav.Item>
                          <Nav.Link href="/viewAvailableDates">Join Playdates!</Nav.Link>
                        </Nav.Item>


                      </NavDropdown>
                    </Nav.Link>


                    <Nav.Link href="#link">
                      <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={logOut}>
                          LogOut
                        </a>
                      </li>
                    </Nav.Link>




                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <Nav.Link href="#link">
                      <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                          Login
                        </Link>
                      </li>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                          Sign Up
                        </Link>
                      </li>
                    </Nav.Link>
                  </div>
                )}


              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>

      <div className="content">
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
