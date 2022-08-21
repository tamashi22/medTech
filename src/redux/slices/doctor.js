import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import DoctorServis from "../../api/servises/DoctorServis";
export const getDoctorById = createAsyncThunk(
  "v1/doctors",
  async ({ id }, thunkAPI) => {
    try {
      const data = await DoctorServis.getDoctorById(id);
      console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||   
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getPatientsByDoctorId = createAsyncThunk(
  "v1/doctors/id/patients",
  async ({ id }, thunkAPI) => {
    try {
      const data = await DoctorServis.getPatientsByDoctorId(id);
      console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getPatientsVisitsByDoctorId=createAsyncThunk(
  "v1/doctor/patient_visits/date",
  async({id ,date},thunkAPI)=>{
    try{
      const data=await DoctorServis.getPatientsVisitsByDoctorId(id,date);
      console.log(data);
      return data;
    }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)
export const getDoctorSheduleByIdWeek=createAsyncThunk(
  "v1/doctor/shedule/id/weekday",
  async({id ,weekday},thunkAPI)=>{
    try{
      const data=await DoctorServis.getDoctorSheduleByIdWeek(id,weekday);
      console.log(data);
      return data;
    }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)
export const getAllDoctors=createAsyncThunk(
  "v1/doctor/all",
  async( thunkAPI)=>{
    try{
      const data=await DoctorServis.getAllDoctors();
      console.log(data);
      return data;
    }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)
export const IncertPatientVisit=createAsyncThunk(
  "v1/patient_visits",
  async(obj,thunkAPI)=>{
    try{
      const data=await DoctorServis.IncertPatientVisit(obj);
      console.log(data);
      return data;
    }catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

const initialState = {
  doctorData: null,
  doctorPatientVisits:null,
  allDoctors:null,
  patientsByDoctor:null,
  doctorShedule:null,
  isVisitCreated:false,
};
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  extraReducers: {
    [getDoctorById.rejected]: (state, action) => {
      state.doctorData = [];
    },
    [getDoctorById.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.doctorData = action.payload;
    },
    [getPatientsVisitsByDoctorId.rejected]:(state,action)=>{
      state.doctorPatientVisits=[]
    },
    [getPatientsVisitsByDoctorId.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.doctorPatientVisits=action.payload
    },
    [getAllDoctors.rejected]:(state,action)=>{
      state.allDoctors=[]
    },
    [getAllDoctors.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.allDoctors=action.payload
    },
    [getPatientsByDoctorId.rejected]:(state,action)=>{
      state.patientsByDoctor=[]
    },
    [getPatientsByDoctorId.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.patientsByDoctor=action.payload
    },
    [getDoctorSheduleByIdWeek.rejected]:(state,action)=>{
      state.doctorShedule=[]
    },
    [getDoctorSheduleByIdWeek.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.doctorShedule=action.payload
    },
    [IncertPatientVisit.rejected]:(state,action)=>{
      state.isVisitCreated=false
    },
    [IncertPatientVisit.fulfilled]:(state,action)=>{
      console.log(action.payload);
      state.isVisitCreated=true
    },
  },
});
const { reducer } = doctorSlice;
export default reducer;
