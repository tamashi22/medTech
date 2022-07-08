import React from 'react'
import fon from "../../images/fon.jpg"
import { TextField } from '@mui/material'
import "./login.css"
import { useFormik } from 'formik'
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as yup from "yup";

function ChangePassword() {
  const validationSchema = yup.object({
    password: yup
      .string('Enter your password')
      .min(8, 'Пароль должен быть не меньше 8 символов')
      .required('Это поле обязательное'),
   confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required("Confirm your password"),
  });
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
  
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigate("/profile")
    },
  });
  return (
    <div className='wrapper'>
   
    <div className="form__wrapper">
     <div className='input__wrapper'>
     <h2 className='forgot__title'>Сменить пароль </h2>
     
     <form onSubmit={formik.handleSubmit}>
     <CssTextField
        
        id="password"
        name="password"
        label="Новый пароль"
        type="password"
       

        value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            width: "450px",
            height: "60px",
            marginTop:"70px",
            marginBottom:"20px"
          }}
        />
        <CssTextField
        
        id="confirmPassword"
        name="confirmPassword"
        label="Повторите пароль"
        type="password"
        
       
        value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          sx={{
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            width: "450px",
            height: "60px",
            
          }}
        />
         <ColorButton variant="contained" type="submit"  sx={{  textTransform: 'none',
        width: "450px",
        height: "60px",
        marginTop:"100px",
        borderRadius: "20px",
        }}>Подтвердить</ColorButton>
        </form>
         </div>
         </div>
         <div className='back'>
          <img className='fon' src={fon}></img>
        </div>
         </div>
  )
}

export default ChangePassword