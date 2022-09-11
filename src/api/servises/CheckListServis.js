import axios from "axios";
const API_URL =  "https://medtech-team5.herokuapp.com/api/";
class CheckListServis{
    async getPatientVisitsByPatientId(id){
        const response = await axios
        .get(API_URL+`v1/patients/${id}/patient_visits`)
        return response.data;
    }
    async getBasicQuestions(){
        const response =await axios 
        .get(API_URL+`v1/questions`)
        return response.data;
    }
    async getAnalizes(){
        const response =await axios 
        .get(API_URL+`v1/analyzes`)
        return response.data;
    }
    async getChecklistByPatientVisitId(id){
        const response =await axios 
        .get(API_URL+`v1/patient_visits/${id}/checklists`)
        return response.data;
    }
    async getAnswerByQuestionId(id,checklistId){
        const response = await axios 
        .get(API_URL+`v1/questions/${id}/answers`,null,{params:{checklistId}})
        return response.data;
    }

}
export default new CheckListServis;