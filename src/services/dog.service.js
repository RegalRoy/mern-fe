import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/dog";

const AddDogTest = () =>{
   return axios.get(API_URL, {headers:authHeader()});
}

const AddDog = (dogObj) =>{
    return axios.post(API_URL, dogObj,  {headers:authHeader()})
 }


const DogService = {
    AddDogTest,
    AddDog
}
export default DogService;