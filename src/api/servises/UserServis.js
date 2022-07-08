import axios from 'axios';
import authHeader from './AuthHeader';
const API_URL = "https://medtech-team5.herokuapp.com//test/";
class UserServis{
    getPublicContent(){
        return axios.get(API_URL + 'all');
      }
      getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
      }
      getDoctorBoard(){
          return axios.get(API_URL + 'doctor', {headers:authHeader()} );
      }
}
export default UserServis();


