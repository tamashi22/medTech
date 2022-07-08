import React from 'react'
import { useState } from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import fon from "../../images/fon.jpg"
import ReactCodeInput from 'react-code-input'
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const SendCode=()=> {
    const navigate=useNavigate();
    const props = {
        inputStyle: {
          
          margin:  '4px',
          border: "2px solid ",
          width: '46px',
          borderRadius: '4px',
          fontSize: '20px',
          height: '46px',
          textAlign:"center",
         borderRadius:"4px",
         
         
        },
        inputStyleInvalid: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          border: '1px solid red'
        }
    }
    const CssTextField = styled(TextField)(({ theme }) => ({

      '& .MuiOutlinedInput-root': {
        borderRadius: "20px",
        backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#DBD2FC',
        
        '& fieldset': {
          
          borderColor:"#DBD2FC",
        },
        '&:hover fieldset': {
          borderColor: '#DBD2FC',
        },
        '&.Mui-focused fieldset': {
          backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff',
          border: "1px solid #6E15EB",
        },
       
      },
      '& label.Mui-focused': {
        color: '#6E15EB',
      },
    }));
    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText("#6E15EB"),
      backgroundColor: "#6E15EB",
      '&:hover': {
        backgroundColor: "#8E15EE",
      },
    }));
    const [counter, setCounter] = React.useState(60);
    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);
    
  return (
    <div className='wrapper'>
   
    <div className="form__wrapper">
     
         <p className='sendcode__title'>На ваш адрес<b> username@gmail.com</b> отправлено письмо с кодом для входа.</p>
         <div className='code'>
         <p className='label'>Введите код</p>
     <ReactCodeInput  fields={6} {...props} />
     
     </div>
     <ColorButton onClick={()=>navigate("/changepassword")} variant="contained" sx={{   textTransform: 'none',
    minWidth: "450px",
    height: "60px",
    marginTop:"100px",
    borderRadius: "20px",
    fontSize:"16px",
    marginBottom:"20px"
    
    }}>Войти</ColorButton>
     <a  href="#" className='resend'>Отправить повторно {counter} сек.</a>
        
         </div>
         <div className='back'>
          <img  className='fon' src={fon}></img>
        </div>
         </div>
  )
}
export default SendCode

