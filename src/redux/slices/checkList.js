import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CheckListServis from "../../api/servises/CheckListServis";
export const getPatientVisitsByPatientId = createAsyncThunk(
    "v1/patients/id/patient_visits",
    async ({ id }, thunkAPI) => {
      try {
        const data = await CheckListServis.getPatientVisitsByPatientId(id);
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
  export const getBasicQuestions = createAsyncThunk(
    "v1/quetions",
    async ( thunkAPI) => {
      try {
        const data = await CheckListServis.getBasicQuestions();
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
  export const getAnalizes = createAsyncThunk(
    "v1/analizes",
    async ( thunkAPI) => {
      try {
        const data = await CheckListServis.getAnalizes();
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
  export const getChecklistByPatientVisitId = createAsyncThunk(
    "v1/patients/patient_visits/id/checklist",
    async ({ id }, thunkAPI) => {
      try {
        const data = await CheckListServis.getChecklistByPatientVisitId(id);
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
  export const getAnswerByQuestionId = createAsyncThunk(
    "v1/questions/id/answers",
    async ({ id,checklistId }, thunkAPI) => {
      try {
        const data = await CheckListServis.getAnswerByQuestionId(id,checklistId);
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
    PatientVisitsByPatientId:null,
    Questions:null,
    Analizes:null,
    currentChecklist:null,
    Answer:null
  }
  const checkSlise = createSlice({
    name: "checklist",
    initialState,
    extraReducers: {
      [getPatientVisitsByPatientId.rejected]: (state, action) => {
        state.PatientVisitsByPatientId = [];
      },
      [getPatientVisitsByPatientId.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.PatientVisitsByPatientId = action.payload;
      },
      [getBasicQuestions.rejected]: (state, action) => {
        state.Questions = [];
      },
      [getBasicQuestions.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.Questions = action.payload;
      },
      [getAnalizes.rejected]: (state, action) => {
        state.Analizes = [];
      },
      [getAnalizes.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.Analizes = action.payload;
      },
      [getChecklistByPatientVisitId.rejected]: (state, action) => {
        state.currentChecklist = [];
      },
      [getChecklistByPatientVisitId.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.currentChecklist = action.payload;
      },
      [getAnswerByQuestionId.rejected]: (state, action) => {
        state.Answer = [];
      },
      [getAnswerByQuestionId.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.Answer = action.payload;
      },
    },
  });
  const { reducer } = checkSlise;
  export default reducer;
  