import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import tableReducer from "./slices/base"
import doctorReducer from "./slices/doctor"
import checkReducer from "./slices/checkList"
import patientReducer from "./slices/patients"
const reducer = {
  auth: authReducer,
  message: messageReducer,
  table:tableReducer,
  doctor:doctorReducer,
  checklist:checkReducer,
  patient:patientReducer
  
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;