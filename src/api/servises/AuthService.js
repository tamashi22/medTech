import axios from "axios";
const API_URL = "https://medtech-team5.herokuapp.com/api/";
class AuthService {
  async login(email, password) {
    const response = await axios
      .post(API_URL + "auth/signin", { email, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
    }
    logout() {
        localStorage.removeItem("user");
      }
   async forgotPassword(emailOrPhoneNumber){
      const response = await axios
      .post(API_URL+"v1/forgot_password",null,{params:{emailOrPhoneNumber}});
        return response.data;
      } 
   async sendcode(code){
      const responce = await axios
      .post (API_URL+"v1/reset_password",null,{params:{code}})
      localStorage.setItem("user_id",JSON.stringify(responce.data))
      return responce.data;
    }
    async onChangePassword(newPassword, id){
      const responce = await axios
      .put (API_URL+`v1/users/${id}/change-password`,null,{params:{newPassword}})
      return responce.data;
    }
    }
    
 export default new AuthService();