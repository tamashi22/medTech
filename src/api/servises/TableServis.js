import axios from "axios";
const API_URL = process.env.REACT_APP_API;
class TableServis{
    //for admin and doctors
    async getPatients(){
        const response = await axios
        .get(API_URL+"v1/patients")
        return response.data;
    }
    async getPatientsVisit(id){
        const response =await axios
        .get(API_URL+`v1/patient_visits/last-patient-visit/${id}`)
        return response.data;
    }
    //only for admin
    async getDoctors(params){
        const responce = await axios
        .get(API_URL+"v1/doctors/all",{params})
        return responce.data;
    }   
    async getWeeks(){
        const responce = await axios
        .get(API_URL+"v1/weeks/all")
        return responce.data;
    } 
}
export default new TableServis