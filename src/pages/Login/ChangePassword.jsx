import React, { useState, useEffect } from "react";
import "./login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CssTextField, ColorButton } from "../../constance/css__const";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import doc from "../../images/newPic.png";
import logo from "../../images/newLogo.png";
import { Button, InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/slices/message";
import { onChangePassword } from "../../redux/slices/auth";
import { validationPasswords } from "../../utils/validations/validationLogin";
const mod_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "#ffff",
  boxShadow: 24,
  borderRadius: "12px",
  p: 10,
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

function ChangePassword() {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  console.log(auth);
  const [loading, setLoading] = useState(false);
  const IsChange = useSelector((state) => state.auth.EmailSended);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.user.id) navigate("/");
  }, [auth.user.id]);

  const handleChangeCode = (formValue) => {
    console.log(formValue);
    const { confirmPassword } = formValue;

    setLoading(true);
    dispatch(onChangePassword({ confirmPassword }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (password, id) => {
    console.log(password, id);
    dispatch(onChangePassword({ confirmPassword: password, id: auth.user.id }));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationPasswords,
    onSubmit: (e) => {
      handleOpen(e.confirmPassword, auth.user);
      console.log(auth.user);
    },
  });

  return (
    <div className="wrapper">
      <div className="fon_bg">
        <img src={logo} alt="logo" className="logo_style" />

        <div className="png">
          <img src={doc} alt="doc" />
        </div>
      </div>
      <div className="form__wrapper">
        <div className="input__wrapper">
          <h1 className="forgot__title">Создание нового пароля </h1>

          <form onSubmit={formik.handleSubmit}>
            <CssTextField
              id="password"
              name="password"
              label="Новый пароль"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                marginTop: "70px",
                marginBottom: "20px",
              }}
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
            />
            <CssTextField
              id="confirmPassword"
              name="confirmPassword"
              label="Повторите пароль"
              type={showPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              sx={{}}
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
            />
            <ColorButton
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",

                marginTop: "100px",
              }}
            >
              Подтвердить
            </ColorButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={mod_style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Пароль успешно изменен !
                </Typography>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    fontSize: "20px",
                    background: " #EEF0F4",
                    width: "50px",
                    height: "40px",
                    border: 0,
                    marginTop: "20px",
                    borderRadius: "10px",
                  }}
                >
                  Ok{" "}
                </button>
              </Box>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
