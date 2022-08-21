import React, { useEffect } from 'react'
import "./App.css"
import LoginPage from './pages/Login/LoginPage';
import ForgotPassword from './pages/Login/ForgotPassword';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SendCode from './pages/Login/SendCode';
import ChangePassword from './pages/Login/ChangePassword';
import Main from './pages/Main/Main';
import { useSelector } from 'react-redux';

function App() {
  const { isLoggedIn } = useSelector(state=>state.auth)
  return (
    <>
    <Routes>
      <Route path='/'element={<LoginPage/>}/>
        <Route path='forgotpassword' element={<ForgotPassword/>}/>
        <Route path='sendcode' element={<SendCode/>}/>
        <Route path='changepassword' element={<ChangePassword/>}/>
        {isLoggedIn &&
          <Route path='/*' element={<Main/>}/>}
    </Routes>
    </>
  );
}

export default App;
