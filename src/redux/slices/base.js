import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import TableServis from "../../api/servises/TableServis";

export const getPatients = createAsyncThunk(
  "v1/patients/",
  async (thunkAPI) => {
    try {
      const data = await TableServis.getPatients();
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

export const getDoctors = createAsyncThunk("v1/doctors", async (thunkAPI) => {
  try {
    const data = await TableServis.getDoctors();
    console.log(data);
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const getPatientsVisit = createAsyncThunk(
  "v1/patient_visits/last-patient-visit",
  async ({ id }, thunkAPI) => {
    try {
      const data = await TableServis.getPatientsVisit(id);
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
export const getWeeks = createAsyncThunk(
  "v1/weeks/all",
  async (thunkAPI) => {
    try {
      const data = await TableServis.getWeeks();
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

const initialState = {
  patients: null,
  doctors: null,
  visit: null,
  weeks:null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  extraReducers: {
    [getPatients.rejected]: (state, action) => {
      state.patients = [];
    },
    [getPatients.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.patients = action.payload;
    },
    [getDoctors.rejected]: (state, action) => {
      state.doctors = [];
    },
    [getDoctors.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.doctors = action.payload;
    },
    [getPatientsVisit.rejected]: (state, action) => {
      state.visit = [];
    },
    [getPatientsVisit.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.visit = action.payload;
    },
    [getWeeks.rejected]: (state, action) => {
      state.weeks = [];
    },
    [getWeeks.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.weeks = action.payload;
    },
  },
});
const { reducer } = tableSlice;
export default reducer;
