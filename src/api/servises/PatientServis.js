import axios from "axios";
const API_URL = process.env.REACT_APP_API;

class PatientServis{
    async getPatientByPatientId(id){
        const response = await axios
        .get(API_URL+`v1/patients/${id}`)
        return response.data;
    }
    async getPatientVisitsByPatientId(id){
        const response = await axios
        .get(API_URL+`v1/patients/${id}/patient_visits`)
        return response.data;
    }
    async getMedcard(id){
        const response = await axios
        .get(API_URL+`v1/patients/${id}/individual-cards`)
        return response.data;
    }
}
export default new PatientServis