//import http from "../http-common";
import axios from 'axios';
//import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'http://localhost:9090/api/';
const token = authService.getToken();

class BoatDataService {
  getAll() {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.get(API_URL + 'boats', { headers});
  }

  get(id) {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.get(API_URL + `boat/${id}`, { headers });
  }

  create(data) {
    const url = `${API_URL}boat`;
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.post(url , data, { headers});

  }

  update(id, data) {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.put(API_URL + `boat/${id}` , data, { headers });
   
  }

  delete(id) {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.delete(API_URL + `boat/${id}` , { headers});
    
  }

  deleteAll() {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.delete(API_URL + 'boats', { headers});
    
  }

  findByName(name) {
    const headers = {
      Authorization: 'Bearer ' + token, // Include 'Bearer ' prefix for JWT
      'Content-Type': 'application/json' // Add Content-Type header
    };
    return axios.get(API_URL + `boats?name=${name}` , { headers});
    //return http.get(`/boats?name=${name}`);
  }

}

export default new BoatDataService();