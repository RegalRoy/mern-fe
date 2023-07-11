import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getUserBoard = () =>{
    return axios.get(API_URL + "user", {headers:authHeader()});
}

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  };
  
  const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  };

  const AddDate = (dateObj) => {
    return axios.post("http://localhost:8080/api/test/postdate", dateObj, { headers: authHeader() })
  }

  const GetDate = () =>{
    return axios.get("http://localhost:8080/api/test/getdate", { headers: authHeader() })
  }

  const ViewDate = (id) =>{
    return axios.get("http://localhost:8080/api/test/getdate/"+id, { headers: authHeader() } )
  }

  const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    AddDate,
    GetDate,
    ViewDate
  };
  
  export default UserService;

  // app.post("/api/test/postdate", [authJwt.verifyToken], controller.postDate)
  // app.get("/api/test/getdate", [authJwt.verifyToken], controller.getDate)
  // app.get("/api/test/getdate/:id", [authJwt.verifyToken], controller.getADate)


