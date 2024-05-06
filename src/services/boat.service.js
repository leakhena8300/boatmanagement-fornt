//import http from "../http-common";
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9090/api/';

class BoatDataService {
  getAll() {
    // Construct the full URL for getting all boats
    return axios.get(API_URL + 'boats', { headers: authHeader() });
    //return http.get("/boats");
  }

  get(id) {
    // Construct the full URL for getting a specific boat by ID
    return axios.get(API_URL + `boat/${id}`, { headers: authHeader() });
  }

  create(data) {
    const url = `${API_URL}boat`;
    return axios.post(url , data, { headers: authHeader() });
    //return http.post("/boat", data);
  }

  update(id, data) {
    return axios.put(API_URL + `boat/${id}` , data, { headers: authHeader() });
    //return http.put(`/boat/${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL + `boat/${id}` , { headers: authHeader() });
    //return http.delete(`/boat/${id}`);
  }

  deleteAll() {
    return axios.delete(API_URL + 'boats', { headers: authHeader() });
    //return http.delete(`/boats`);
  }

  findByName(name) {
    return axios.get(API_URL + `boats/name=${name}` , { headers: authHeader() });
    //return http.get(`/boats?name=${name}`);
  }

}

export default new BoatDataService();