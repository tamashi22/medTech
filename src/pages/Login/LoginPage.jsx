import React from 'react'
import "./login.css"
import pose1 from "../../images/pose_1.png"
import Images from '../../images'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Введенный email недействителен')
    .required('Это поле обязательное'),
  password: yup
    .string('Enter your password')
    .min(8, 'Пароль должен быть не меньше 8 символов')
    .required('Это поле обязательное'),
});
export default function LoginPage() {
  const navigate= useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigate("/profile")
    },
  });
  return (
    <div className='wrapper'>
       <img src={pose1} className="bg" alt="hey" />
       <div className="form__wrapper">
        <div className='input__wrapper'> 
        <h1>Добро пожаловать!</h1>
        <h4>Пожалуйста введите свои данные</h4>
        <form onSubmit={formik.handleSubmit}>
          
        <TextField
          id="email"
          name="email"
          label="Введите ваш E-mail"
          placeholder="example@medtech.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        <TextField
        
        id="password"
        name="password"
        label="Введите пароль"
        type="password"
        autoComplete="current-password"
        value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
        <Button variant="contained" type="submit" sx={{background:"#2D89FF",width:"100%",height: "50px",marginTop:"50px", marginBottom:"33px",color:"#000000",fontWeight:"600", fontSize:"17px", lineHeight: "23px",   textTransform: 'none',}}>Войти</Button>
       
        </form>
       <div sx={{marginTop:"30px"}}>
        <Link to="/forgotpassword" className='forgot'>Забыли пароль ?</Link>
        </div>
        </div>
       </div> 
    </div>
  )
}
