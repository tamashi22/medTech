import React from 'react'
import fon from "../../images/fon.jpg"
import "./login.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
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
export default function ForgotPassword() {
    const navigate=useNavigate();
  return (
    <div className='wrapper'>
     
       <div className="form__wrapper">
       
            <h2 className='forgot__title'>Забыли свой пароль ? </h2>
            <form>
          
        <CssTextField
          id="outlined-textarea"
          label="Введите ваш E-mail"
          placeholder="example@medtech.com"
          multiline
          sx={{ 
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            width: "450px",
            height: "60px",
            marginTop:"100px"
          }}
        />
        <ColorButton variant="contained" onClick={()=>navigate("/sendcode")} sx={{   textTransform: 'none',
       width: "450px",
       height: "60px",
       marginTop:"100px",
       borderRadius: "20px",
      }}>Отправить</ColorButton>
        </form>
            </div>
           
            <div className='back'>
          <img className='fon' src={fon}></img>
        </div>
            </div>

  )
}
