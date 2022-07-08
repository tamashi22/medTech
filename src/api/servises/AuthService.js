import axios from "axios";
const API_URL = "https://medtech-team5.herokuapp.com//";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "auth/signin", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
    }
    logout() {
        localStorage.removeItem("user");
      }
    }
    
 export default new AuthService();