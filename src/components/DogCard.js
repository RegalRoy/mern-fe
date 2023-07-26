// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const DogCard = (props) => {
//   const { dog, imageUrl } = props;
//   const [selectedImage, setSelectedImage] = useState('');

//   useEffect(() => {
//     // Check if the image URL exists in localStorage
//     const storedImageUrl = localStorage.getItem('dogImage');
//     if (storedImageUrl) {
//       setSelectedImage(storedImageUrl);
//     } else {
//       // If no image URL is in localStorage, set the default image URL
//       setSelectedImage(imageUrl);
//     }
//   }, [imageUrl]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setSelectedImage(reader.result);
//       // Save the image URL to localStorage when the user selects an image
//       localStorage.setItem('dogImage', reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className='card'>
//       <img src={selectedImage} alt='Dog' height={200} />
//       <input type='file' onChange={handleImageChange} accept='image/*' />
//       <div className='desc'>
//         <h2>
//           <Link to={`/viewDog/${dog._id}`}>NAME: {dog.dogName}</Link>
//         </h2>
//         <h3>Breed: {dog.dogBreed}</h3>
//         <p>Size: {dog.dogSize}</p>
//       </div>
//     </div>
//   );
// };

// export default DogCard;



import React from 'react';
import {Link} from 'react-router-dom';
// import '../App.css';

const DogCard =(props)=>{
    const dog = props.dog;
    return (
        <div className='card'>
          
          <img
            src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
            alt='Books'
            height={200}
          />
          <div className='desc'>
            <h2>
              <Link to={`/viewDog/${dog._id}`}>NAME: {dog.dogName}</Link>
            </h2>
            <h3>Breed: {dog.dogBreed}</h3>
            <p>Size: {dog.dogSize}</p>
          </div>
        </div>
      );
}

export default DogCard;