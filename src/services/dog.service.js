import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/dog";

const AddDogTest = () =>{
   return axios.get(API_URL, {headers:authHeader()});
}

const AddDog = (dogObj) =>{
    return axios.post(API_URL, dogObj,  {headers:authHeader()})
 }

 const getDog = (id) =>{
    return axios.get(API_URL + "/" + id, {headers:authHeader()})
 }

 const deleteDog =(id)=>{
    return axios.delete(API_URL +"/"+id ,{headers:authHeader()})
 }

 const updateDog = (id, dogObj) =>{
    return axios.put(API_URL + "/" +id, dogObj, {headers:authHeader()} )
 }

 const updateDogPicture = (id, file) =>{
   try {
      //initialize a formData section for the API call
      const formData = new FormData();
      //append the image
      formData.append("file", file);

      const response = axios.put(
        API_URL + "/" + id, formData, {headers:authHeader()} );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user profile image");
    }
}

const DogService = {
    AddDogTest,
    AddDog,
    getDog,
    deleteDog,
    updateDog,
    updateDogPicture
}
export default DogService;