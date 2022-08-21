import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PatientServis from "../../api/servises/PatientServis";
export const getPatientByPatientId = createAsyncThunk(
    "v1/patients/id",
    async ({ id }, thunkAPI) => {
      try {
        const data = await PatientServis.getPatientByPatientId(id);
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
  export const getPatientVisitsByPatientId = createAsyncThunk(
    "v1/patients/id/patient_visits",
    async ({ id }, thunkAPI) => {
      try {
        const data = await PatientServis.getPatientVisitsByPatientId(id);
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
  export const getMedcard = createAsyncThunk(
    "v1/patients/id/individual-cards",
    async ({ id }, thunkAPI) => {
      try {
        const data = await PatientServis.getMedcard(id);
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
  const initialState={
    currentPatient:null,
    currentPatientVisits:null,
    medcard:null
  }
  const patientsSlise = createSlice({
    name: "patients",
    initialState,
    extraReducers: {
      [getPatientByPatientId.rejected]: (state, action) => {
        state.currentPatient = [];
      },
      [getPatientByPatientId.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.currentPatient = action.payload;
      },
      [getPatientVisitsByPatientId.rejected]: (state, action) => {
        state.currentPatientVisits = [];
      },
      [getPatientVisitsByPatientId.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.currentPatientVisits = action.payload;
      },
      [getMedcard.rejected]: (state, action) => {
        state.medcard = [];
      },
      [getMedcard.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.medcard = action.payload;
      },
     
    },
  });
  const { reducer } = patientsSlise;
  export default reducer;
  