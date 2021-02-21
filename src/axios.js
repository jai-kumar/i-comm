import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-i-comm.cloudfunctions.net/api"
  // baseURL: "http://localhost:5001/i-comm/us-central1/api"
});

export default instance;