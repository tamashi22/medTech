import React, { useState, useEffect  } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./login.css"
import fon from "../../images/fon.jpg"

import { Link, Navigate, useNavigate,Redi } from 'react-router-dom';
import { Formik, useFormik } from 'formik';

import { login } from '../../redux/slices/auth';
import { clearMessage } from '../../redux/slices/message';
import { CssTextField ,ColorButton,validationSchema} from '../../constance/css__const';


const  LoginPage  =(props)=> {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const navigate= useNavigate()

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (event) => {
      
       handleLogin()
     
    },
  }); 
 
  if (isLoggedIn) {
    return navigate("/profile")
  } 
  return (
    <div className='wrapper'>
     
      <div className='form__wrapper'>
      <h1 className='title__log'>Вход</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
           {({
             
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <>
        <CssTextField
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
            width: "450px",
            height: "60px",
            marginBottom:"35px",
            border:"none", 
          }}
        />

        <CssTextField
        id="password"
        name="password"
        label="Введите пароль"
        type="password"
        autoComplete="current-password"
        value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          placeholder="*********"
          sx={{
            
            fontSize: "18px",
            lineHeight: "21px",
            letterSpacing: "-0.04em",
            color: "#141414",
            width: "450px",
            height: "60px",
            marginBottom:"60px",
          }}

        />
        <ColorButton variant="contained" type="submit" sx={{width: "450px",
            height: "60px",
            
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
            textTransform: "none",
            
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
             marginBottom: "30px"
            }} >Войти</ColorButton>

        </> )}
        </Formik>
        
       <div sx={{marginTop:"30px"}}>
       {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
       
      )}
        <Link to="/forgotpassword" className='forgot'>Забыли пароль ?</Link>
        </div>
        </div>
        <div className='back'>
          <img className='fon' src={fon}></img>
        </div>
        </div>
      
  )
}
export default LoginPage;