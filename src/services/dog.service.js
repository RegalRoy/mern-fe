import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = "http://localhost:8080/api/test/dog";
const API_URL = "https://project-mern-be.onrender.com/api/test/dog"

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


const DogService = {
    AddDogTest,
    AddDog,
    getDog,
    deleteDog,
    updateDog
}
export default DogService;