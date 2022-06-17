import React from 'react'
import "./App.css"
import LoginPage from './pages/Login/LoginPage';
import ForgotPassword from './pages/Login/ForgotPassword';
import { Route, Routes } from 'react-router-dom';
import SendCode from './pages/Login/SendCode';
import ChangePassword from './pages/Login/ChangePassword';
import ProfilePage from './pages/Profile/ProfilePage';
function App() {
  return (
    <>
   
    <Routes>
      <Route path='/'element={<LoginPage/>}/>
        <Route path='forgotpassword' element={<ForgotPassword/>}/>
        <Route path='sendcode' element={<SendCode/>}/>
        <Route path='changepassword' element={<ChangePassword/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
    </Routes>
    </>
  );
}

export default App;
