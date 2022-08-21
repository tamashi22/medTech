import axios from "axios";

const token = localStorage.getItem("token");

export const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    ContentType: "application/json",
  },
});

axios.interceptors.request.use(async (req) => {
  req.headers["Autorization"] = "Bearer " + token;

  return;
});

// axios.interceptors.response.use(
//     req => req,
//     async err => {
//         const originalConfig = err.config;
//         console.log(err.config)
//        if (originalConfig.url !== "/auth/signin" && err.response) {
//      if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;
//             }
// const token = TokenService.getLocalAccessToken();
//        if (token) {
//           config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
//        }
//         return config;
//        }
//    },
// (error) => {
//       return Promise.reject(error);
//     }
// )
