import axios from 'axios';
import authHeader from './AuthHeader';
const API_URL = process.env.REACT_APP_API;
class UserServis{
    getPublicContent(){
        return axios.get(API_URL + 'all');
      }
      getAdminBoard() {
        return axios.get(API_URL + 'test/admin', { headers: authHeader() });
      }
      getDoctorBoard(){
          return axios.get(API_URL + 'test/doctor', {headers:authHeader()} );
      }
}
export default UserServis();


