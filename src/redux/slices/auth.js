import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../../api/servises/AuthService";
const user = JSON.parse(localStorage.getItem("user"));
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
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
// export const logout = createAsyncThunk("auth/logout", async () => {
//   await AuthService.logout();
// });

export const sendEmail= createAsyncThunk(
  "v1/forgot_password",
  async({email},thunkAPI )=>{
    try{
      const data = await AuthService.forgotPassword(email);
      console.log(data)
      console.log(email)
      return email;
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
export const sendCode=createAsyncThunk(
  "v1/reset_password",
  async({code},thunkAPI )=>{
    try{
      const data =await AuthService.sendcode(code);
      console.log(data)
      return data
    }
    catch (error) {
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
export const onChangePassword=createAsyncThunk(
  "v1/users/id/change-password",
  async({confirmPassword, id},thunkAPI )=>{
    try{
      const data =await AuthService.onChangePassword(confirmPassword, id);
    console.log(data)
      return {data};
    }
    catch (error) {
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
const userfunc=()=> user ? {isLoggedIn: true, user} : {isLoggedIn: false, user: ""}
const initialState = {
  ...userfunc(),
  EmailSended:false,
  currentEmail:null,
  CodeSended:false,
  PasswordChanged:false
}
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: {
    
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    
    [sendEmail.rejected]:(state ,action)=>{
      state.EmailSended=false;
    },
    [sendEmail.fulfilled]:(state ,action)=>{
      state.EmailSended=true;
      state.currentEmail = action.payload;
    },
    [sendEmail.rejected]:(state ,action)=>{
      state.CodeSended=false;
    },
    [sendCode.fulfilled]: (state, action) => {
      console.log("HERE");
      state['user']['id'] = action.payload.id;
      console.log(action.payload);
      console.log("THERE");
    },
    [onChangePassword.rejected]:(state,action)=>{
      state.PasswordChanged=false
    },
    [onChangePassword.fulfilled]:(state,action)=>{
      state.PasswordChanged=true
    }


  },
});
const { reducer } = authSlice;
export const {
  logout
} = authSlice.actions;
export default reducer;