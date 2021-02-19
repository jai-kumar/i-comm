import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/i-comm/us-central1/api"
});

export default instance;