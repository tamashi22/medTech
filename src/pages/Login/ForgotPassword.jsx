import React from 'react'
import pose2 from "../../images/pose_2.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
    const navigate=useNavigate();
  return (
    <div className='wrapper'>
       <img src={pose2} className="bg" alt="hey" />
       <div className="form__wrapper">
        <div className='input__wrapper'>
            <h1 className='forgot__title'>Забыли свой пароль ? </h1>
            <form>
          
        <TextField
          id="outlined-textarea"
          label="Введите ваш E-mail"
          placeholder="example@medtech.com"
          multiline
          sx={{ 
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            color: "#141414",
              width:"100%",
              height: "47px",
              marginTop:'40px'
              
          }}
        />
        <Button variant="contained" onClick={()=>navigate("/sendcode")} sx={{background:"#2D89FF",width:"100%",height: "50px",marginTop:"150px", marginBottom:"33px",color:"#000000",fontWeight:"600", fontSize:"17px", lineHeight: "23px",   textTransform: 'none',}}>Отправить</Button>
        </form>
            </div>
            </div>
            </div>

  )
}
