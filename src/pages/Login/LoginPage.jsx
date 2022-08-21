import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import logo from "../../images/newLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { login } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { CssTextField, ColorButton } from "../../constance/css__const";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import doc from "../../images/newPic.png";
import { Checkbox } from "@mui/material";
import { validationSchema } from "../../utils/validations/validationLogin";
const LoginPage = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    console.log(formValue);
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
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (event) => {
      handleLogin(event);
    },
  });

  if (isLoggedIn) {
    if (user.pwdChangeRequired == true) {
      // console.log(user);
      navigate("/changepassword");
    } else {
      navigate("/main");
    }
  }

  return (
    <div className="wrapper">
      <div className="fon_bg">
        <img src={logo} alt="logo" className="logo_style" />

        <div className="png">
          <img src={doc} alt="doc" />
        </div>
      </div>

      <div className="form__wrapper">
        <h1 className="title__log">Вход</h1>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        >
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
              marginTop: "50px",
              marginBottom: "40px",
            }}
          />
          <CssTextField
            id="password"
            name="password"
            label="Введите пароль"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder="*********"
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: "60px",
            }}
          />
          <ColorButton
            variant="contained"
            type="submit"
            sx={{
              marginBottom: "30px",
            }}
          >
            Войти
          </ColorButton>

          <div sx={{ marginTop: "30px" }}>
            {message && (
              <div className="form-group">
                <div
                  style={{
                    color: "red",
                    fontSizre: "14px",
                    marginBottom: "5px",
                  }}
                >
                  {message}
                </div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ display: "flex" }}>
                <p style={{ margin: 0 }}>Запомнить меня</p>
                <Checkbox
                  sx={{ padding: 0, marginLeft: "3px," }}
                  size="small"
                />
              </div>
              <Link to="/forgotpassword" className="forgot">
                Забыли пароль ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
