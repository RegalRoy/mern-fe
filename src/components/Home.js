import React, { useState, useEffect } from "react";
import '../App.css'
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [searchText, setSearchText] = useState('');
  const [dogImageUrl, setDogImageUrl] = useState('');
  const apiUrl = 'https://dog.ceo/api/breed/';

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data.message);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  const handleSearch = async () => {
    if (searchText) {
      try {
        const response = await fetch(`${apiUrl}${searchText}/images/random`);
        const data = await response.json();
        setDogImageUrl(data.message);
        console.log(searchText);
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    }
  };

  return (
    <div className="home-container">
    <header className="jumbotron">
    <div className="centered-search">
      <p>Want to see a different dog breed? Search Here.</p>
        <input
            type="text"
            placeholder="Ex: shiba"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        {/* <button className="search-button">Search</button> */}
        <button className="search-button" onClick={handleSearch}>
            Search
          </button>
      </div>

      <img
          src={searchText && dogImageUrl ? dogImageUrl : content} // Use dogImageUrl if there's a search and dogImageUrl is available, otherwise use content
          alt={searchText && dogImageUrl ? "Dog" : "alt title"} // Alt text depending on search and dogImageUrl availability
          className="rounded mx-auto d-block dog-img"
        />

      {/* <img
        src={content}
        alt="alt title"
        className="rounded mx-auto d-block logo-img"
      /> */}

          {/* <img
            src={dogImageUrl}
            alt="Dog"
            className="rounded mx-auto d-block dog-img"
          /> */}
        

        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <div id="about" className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="section-title">About Sniffers</h2>
                <p className="section-subtitle">
                  Welcome to Sniffers, where doggy dreams come true!
                </p>
                <p className="section-text">
                  At Sniffer, we're passionate about bringing
                  happiness to your furry friends through meaningful playdates.
                  Our platform is designed to connect dog owners like you,
                  creating a vibrant community where dogs can socialize, play,
                  and build lifelong friendships. Whether you're a new pup
                  parent looking for companionship or an experienced dog lover
                  seeking playdate opportunities, we're here to make every tail
                  wag and every bark echo with joy.
                </p>
                {/* <button className="btn btn-primary btn-lg">Get Started</button> */}
              </div>
            </div>
          </div>
          <div id="why-choose-us" className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="section-title">Why Choose Us?</h2>
                <ul className="section-list">
                <li>
                  <strong>Tailored Playdate Experiences:</strong> We understand
                  that each dog is unique, with their own personality and
                  preferences. Our intuitive matching system ensures that your
                  dog finds the perfect playmate, making every playdate a
                  memorable adventure.
                </li>
                {/* <li>
                  <strong>Safe and Secure:</strong> Your dog's safety is our top
                  priority. All playdates are arranged in dog-friendly
                  environments, and we encourage responsible pet ownership. Rest
                  assured, your dog will have a blast in a secure and supervised
                  setting.
                </li> */}
                <li>
                  <strong>Community of Dog Lovers:</strong> Join a community
                  that shares your love for dogs. Connect with like-minded dog
                  owners, exchange stories, and arrange playdates with newfound
                  friends. Our forums and events create opportunities for you
                  and your dog to socialize both online and offline.
                </li>
                <li>
                  <strong>Convenient Scheduling:</strong> With our user-friendly
                  platform, scheduling playdates has never been easier. Simply
                  set up your dog's profile, specify availability, and let the
                  playdates begin! Whether it's a weekend romp or a midweek
                  adventure, we've got you covered.
                </li>
                <li>
                  <strong>Positive Impact:</strong> Dogs are more than just pets
                  – they're family. By arranging playdates, you're not only
                  providing your furry friend with joy but also promoting their
                  mental and physical well-being. Join us in fostering a
                  healthier, happier dog community.
                </li>
                </ul>
                <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
