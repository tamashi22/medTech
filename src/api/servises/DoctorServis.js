import axios from "axios";
const API_URL =  "https://medtech-team5.herokuapp.com/api/v1/";
class DoctorServis{
    //for admin and doctors
    async getDoctorById(id){
        const response = await axios
        .get(API_URL+`v1/doctors/${id}`)
        return response.data;
    }
    async getPatientsVisitsByDoctorId(id,date){
        const responce = await axios
        .get(API_URL+`v1/doctors/${id}/patient_visits/date`,{params:{date}})
        return responce.data;
    }
    async getPatientsByDoctorId(id){
        const responce = await axios
        .get(API_URL+`v1/doctors/${id}/patients`)
        return responce.data;
    }
    async getAllDoctors(){
        const responce = await axios
        .get(API_URL+`v1/doctors/all`)
        return responce.data;
    }   
    async getDoctorSheduleByIdWeek(id,weekday){
        const responce = await axios
        .get(API_URL+`v1/doctors/${id}/doctor_schedules`,{params:{weekday}})
        return responce.data;
    }
    async IncertPatientVisit(data){
        const responce = await axios
        .post(API_URL+`v1/patient_visits`,data)
        return responce.data;
    }
}
export default new DoctorServis