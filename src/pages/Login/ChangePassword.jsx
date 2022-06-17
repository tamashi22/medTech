import React from 'react'
import pose4 from "../../images/pose_4.png"
import { TextField } from '@mui/material'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
function ChangePassword() {
  const navigate=useNavigate()
  return (
    <div className='wrapper'>
    <img src={pose4} className="bg" alt="hey" />
    <div className="form__wrapper">
     <div className='input__wrapper'>
     <h2 className='forgot__title'>Сменить пароль </h2>
     <p className='changepass'>Пожалуйста, убедитесь, что вы выбрали надежный пароль </p>
     <form>
     <TextField
        
        id="password"
        name="password"
        label="Новый пароль"
        type="password"
        autoComplete="current-password"
       
          sx={{
            
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            color: "#141414",
              width:"100%",
              height: "47px",
              marginTop:'50px',
          }}
        />
        <TextField
        
        id="password"
        name="password"
        label="Повторите пароль"
        type="password"
        autoComplete="current-password"
       
          sx={{
            
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            color: "#141414",
              width:"100%",
              height: "47px",
              marginTop:'30px',
          }}
        />
         <Button variant="contained" onClick={()=>navigate("/")} sx={{background:"#2D89FF",width:"100%",height: "50px",marginTop:"150px", marginBottom:"33px",color:"#000000",fontWeight:"600", fontSize:"17px", lineHeight: "23px",   textTransform: 'none',}}>Подтвердить</Button>
        </form>
         </div>
         </div>
         </div>
  )
}

export default ChangePassword