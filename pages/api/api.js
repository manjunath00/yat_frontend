import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "applicaton/json";

axios.interceptors.request.use(
  (request) => {
    // console.log("Request logged", request);
    const token = JSON.parse(localStorage.getItem("token"));

    request.headers.authorization = `Bearer ${token}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log("Response logged", response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default axios;
