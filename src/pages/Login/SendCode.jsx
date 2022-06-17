import React from 'react'
import { useState } from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import pose3 from "../../images/pose_3.png"
import ReactCodeInput from 'react-code-input'
import { border, borderRadius } from '@mui/system'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const SendCode=()=> {
    const navigate=useNavigate();
    const props = {
        inputStyle: {
          
          margin:  '4px',
          border: "2px solid ",
          width: '46px',
          borderRadius: '3px',
          fontSize: '20px',
          height: '46px',
          textAlign:"center",
         borderRadius:"4px"
        },
        inputStyleInvalid: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '40px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: 'red',
          border: '1px solid red'
        }
    }
    const [counter, setCounter] = React.useState(60);
    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);
    
  return (
    <div className='wrapper'>
    <img src={pose3} className="bg" alt="hey" />
    <div className="form__wrapper">
     <div className='input__wrapper'>
         <h2>Код подтверждения</h2>
         <p>На ваш адрес<b> username@gmail.com</b> отправлено письмо с кодом для входа.</p>
         <div className='code'>
         <p className='label'>Введите код</p>
     <ReactCodeInput  fields={6} {...props} />
     </div>
     <Button onClick={()=>navigate("/changepassword")} variant="contained" sx={{background:"#2D89FF",width:"100%",height: "50px",marginTop:"100px", marginBottom:"33px",color:"#000000",fontWeight:"600", fontSize:"17px", lineHeight: "23px",   textTransform: 'none',}}>Войти</Button>
     <Button variant="contained" sx={{background:"#E8F2FF",width:"100%",height: "50px",marginTop:"10px", marginBottom:"33px",color:"#000000",fontWeight:"600", fontSize:"17px", lineHeight: "23px",   textTransform: 'none',}}>Отправить повторно {counter} сек.</Button>
         </div>
         </div>
         </div>
  )
}
export default SendCode

