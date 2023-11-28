import axios from "axios";
//mock API
export const baseURL = "https://jsonplaceholder.typicode.com";

export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${baseURL}${endpoint}`,
    data: body,
  })
  
}
