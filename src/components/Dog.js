// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import DogService from "../services/dog.service";
// import AuthService from "../services/auth.service";

// const Dog = () => {
//   const navigate = useNavigate();
//   const currentUser = AuthService.getCurrentUser();
//   const [dog, setDog] = useState({
//     dogName: '',
//     dogAge: '',
//     dogBreed: '',
//     dogSize: '',
//     dogTemperament: "",
//     ownerId: currentUser.id
//   });

//   const [imageFile, setImageFile] = useState(null);

//   const onChange = (e) => {
//     setDog({ ...dog, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };

//   const handleCreateDog = (e) => {
//     e.preventDefault();
  
//     // Create a FormData object to hold all form data (including the image)
//     const formData = new FormData();
//     formData.append('dogName', dog.dogName);
//     formData.append('dogAge', dog.dogAge);
//     formData.append('dogBreed', dog.dogBreed);
//     formData.append('dogSize', dog.dogSize);
//     formData.append('dogTemperament', dog.dogTemperament);
//     formData.append('image', imageFile); // Append the image file

//     DogService.AddDog(formData)
//       .then((res) => {
//         setDog({
//           dogName: '',
//           dogAge: '',
//           dogBreed: '',
//           dogSize: '',
//           dogTemperament: '',
//         });
//         setImageFile(null); // Reset the image file state
//         navigate('/user');
//       })
//       .catch((error) => {
//         // Handle any errors with the image upload
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleCreateDog}>
//         <div className="form-group">
//           <label htmlFor="dogName">Dog Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="dogName"
//             value={dog.dogName}
//             onChange={onChange}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="dogAge">Dog Age</label>
//           <select name="dogAge" id="pet-select" value={dog.dogAge} onChange={onChange}>
//             <option value="">--Please choose an option--</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 <option value="6">6</option>
//                 <option value="7">7</option>
//                 <option value="8">8</option>
//                 <option value="9">9</option>
//                 <option value="10">10</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="dogBreed">Breed</label>
//           <select name="dogBreed" id="pet-select" value={dog.dogBreed} onChange={onChange}>
//             <option value="">--Please choose an option--</option>
//             <option value="">--Please choose an option--</option>
//             <option value="Labrador">Labrador</option>
//             <option value="French Bulldog">French Bulldog</option>
//             <option value="English Bulldog">English Bulldog</option>
//             <option value="Golden Retriever">Golden Retriever</option>
//             <option value="Beagle">Beagle</option>
//             <option value="German Shepherd">German Shepherd</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="dogSize">Size</label>
//           <select name="dogSize" id="pet-select" value={dog.dogSize} onChange={onChange}>
//             <option value="">--Please choose an option--</option>
//             <option value="Small">Small</option>
//             <option value="Medium">Medium</option>
//             <option value="Large">Large</option>
//             <option value="Giant">Giant</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="dogTemperament">Temperament</label>
//           <select name="dogTemperament" id="pet-select" value={dog.dogTemperament} onChange={onChange}>
//             <option value="">--Please choose an option--</option>
//             <option value="Assertive ">Assertive </option>
//             <option value="aggressive">aggressive</option>
//             <option value="neutral">neutral</option>
//                 <option value="passive">passive</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Dog Image</label>
//           <input
//             type="file"
//             className="form-control"
//             name="image"
//             accept=".jpg, .jpeg, .png"
//             onChange={handleImageChange}
//           />
//         </div>

//         <input
//           type='submit'
//           className='btn btn-outline-warning btn-block mt-4'
//         />
//       </form>
//     </div>
//   );
// };

// export default Dog;


// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import DogService from "../services/dog.service";
// import axios from 'axios';
// import authHeader from '../services/auth-header';
// import { useNavigate } from 'react-router-dom';
// import AuthService from "../services/auth.service";


// const Dog = () => {
//     const navigate = useNavigate();
//     const currentUser = AuthService.getCurrentUser();
//     const [dog, setDog] = useState({
//         dogName: '',
//         dogAge: '',
//         dogBreed: '',
//         dogSize: '',
//         dogTemperament: "",
//         ownerId: currentUser.id
//     })
//     const onChange = (e) => {
//         setDog({ ...dog, [e.target.name]: e.target.value })
//     }


//     //     useEffect(()=>{
//     //     DogService.AddDogTest().then(
//     //         (r)=>{setDog(r.data)}
//     //     )
//     // })




//     const handleCreateDog_ = (e) => {
//         e.preventDefault();

//         axios.post("http://localhost:8080/api/test/dog", dog, { headers: authHeader() })
//             .then((res) => {
//                 setDog({
//                     dogName: '',
//                     dogAge: '',
//                     dogBreed: '',
//                     dogSize: '',
//                     dogTemperament: '',
//                 });
//                 // navigate('/')

//             })
//     }

//     const handleCreateDog = (e) => {
//         e.preventDefault();
//         console.log(dog)
//         DogService.AddDog(dog)
//             .then((res) => {
//                 setDog({
//                     dogName: '',
//                     dogAge: '',
//                     dogBreed: '',
//                     dogSize: '',
//                     dogTemperament: "",
//                     // ownerId:""
//                 });
//                 navigate('/user')
//             })
//     }

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DogService from "../services/dog.service";
import AuthService from "../services/auth.service";

const Dog = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [dog, setDog] = useState({
        dogName: '',
        dogAge: '',
        dogBreed: '',
        dogSize: '',
        dogTemperament: '',
        ownerId: currentUser.id,
        dogPicture: null, // New field to hold the picture file
    });

    const onChange = (e) => {
        if (e.target.name === 'dogPicture') {
            // When handling the picture file, store it in the state
            setDog({ ...dog, [e.target.name]: e.target.files[0] });
        } else {
            setDog({ ...dog, [e.target.name]: e.target.value });
        }
    };

    const handleCreateDog = (e) => {
        e.preventDefault();
        console.log(dog)
        // Use FormData to send the data, including the picture
        const formData = new FormData();
        formData.append('dogName', dog.dogName);
        formData.append('dogAge', dog.dogAge);
        formData.append('dogBreed', dog.dogBreed);
        formData.append('dogSize', dog.dogSize);
        formData.append('dogTemperament', dog.dogTemperament);
        formData.append('ownerId', dog.ownerId);
        formData.append('dogPicture', dog.dogPicture);
        console.log("Hello"); 
        for (var value of formData.values()) {
            console.log(value); 
         }

        DogService.AddDog(formData)
            .then((res) => {
                setDog({
                    dogName: '',
                    dogAge: '',
                    dogBreed: '',
                    dogSize: '',
                    dogTemperament: "",
                    dogPicture: null,
                });
                navigate('/user');

            })
            .catch((error) => {
                // Handle error if any
            });

    };

   const updateProfileImage = (e) => {
        //trigger the upload file form
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        //open the file upload form
        input.onchange = () => {
          const file = input.files[0];
          DogService.updateDogPicture(this.userId, file).then(
            (response) => {
            //   this.dog.dogPicture = response.profileImage;
              console.log(response)
            },
            (error) => {
              console.log(error);
            }
          );
        };
        input.click();
      }

    return (
        <div>
            <form onSubmit={handleCreateDog}>
                <div className="form-group">
                    <label htmlFor="username">Dog Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dogName"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dogPicture">Dog Picture</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="dogPicture"
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Dog Age</label>
                    <select name="dogAge" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                {/* <div className="form-group">
            <label htmlFor="username">Breed</label>
            <input
              type="text"
              className="form-control"
              name="dogBreed"
              onChange={onChange}
            />
            </div> */}

                <div className="form-group">
                    <label htmlFor="username">Breed</label>
                    <select name="dogBreed" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Labrador">Labrador</option>
                        <option value="French Bulldog">French Bulldog</option>
                        <option value="English Bulldog">English Bulldog</option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Beagle">Beagle</option>
                        <option value="German Shepherd">German Shepherd</option>
                    </select>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="username">Size</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dogSize"
                        onChange={onChange}
                    />
                </div> */}

                <div className="form-group">
                    <label htmlFor="username">Size</label>
                    <select name="dogSize" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Giant">Giant</option>

                    </select>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="username">Temperament</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dogTemperament"
                        onChange={onChange}
                    />

                </div> */}

                <div className="form-group">
                    <label htmlFor="username">Temperament</label>
                    <select name="dogTemperament" id="pet-select" onChange={onChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="Assertive ">Assertive </option>
                        <option value="aggressive">aggressive</option>
                        <option value="neutral">neutral</option>
                        <option value="passive">passive</option>

                    </select>
                </div>


                <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                />
            </form>
        </div>
    )
}

export default Dog;