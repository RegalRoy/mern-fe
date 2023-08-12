import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get("https://dog.ceo/api/breeds/image/random");
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
    return axios.post(API_URL+"postdate", dateObj, { headers: authHeader() })
  }

  const GetDate = () =>{
    return axios.get(API_URL+"getdate", { headers: authHeader() })
  }

  const ViewDate = (id) =>{
    return axios.get(API_URL+"getdate/"+id, { headers: authHeader() } )
  }

  const GetPic =(picOwner) =>{
    return axios.get(API_URL+"postdate/pic/"+picOwner,{ headers: authHeader() } )
  }

  const DeleteDate = (id) =>{
    return axios.delete(API_URL+"getdate/"+id,{ headers: authHeader() } )
  }

  const EditDate =(id, dateObj)=>{
    return axios.put(API_URL+"getdate/"+id,dateObj, {headers: authHeader() } )
  }

  const UploadPic = (dateObj) => {
    return axios.post(API_URL+"postdate/pic",dateObj, {headers: authHeader() } )
  }

  const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    AddDate,
    GetDate,
    ViewDate,
    DeleteDate,
    EditDate,
    UploadPic,
    GetPic
  };
  
  export default UserService;

  // app.post("/api/test/postdate", [authJwt.verifyToken], controller.postDate)
  // app.get("/api/test/getdate", [authJwt.verifyToken], controller.getDate)
  // app.get("/api/test/getdate/:id", [authJwt.verifyToken], controller.getADate)
  // app.delete("/api/test/getdate/:id", [authJwt.verifyToken], controller.deleteDate)
  // app.put("/api/test/getdate/:id", [authJwt.verifyToken], controller.updateDate)


//"/api/test/postdate/pic"