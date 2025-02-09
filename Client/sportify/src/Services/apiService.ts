import axios from "axios";
import {config} from "./config";
// const api = axios.create({
//   baseURL: "https://www.sportify.com", // Our Custom Base URL
// });

// export default api;
export function createUrl(path) {
  const url = `${config.serverUrl}/${path}`
  console.log("URL:", url)
  return url;
}


