import React, { useState, useEffect } from "react";
import "./login.css";
import logo from "../../images/newLogo.png";
import { useNavigate } from "react-router-dom";
import { CssTextField, ColorButton } from "../../constance/css__const";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/slices/message";
import doc from "../../images/newPic.png";
import { sendEmail } from "../../redux/slices/auth";
import { validationEmail } from "../../utils/validations/validationLogin";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const currentEmail = useSelector((state) => state.auth.currentEmail);
  const EmailSended = useSelector((state) => state.auth.EmailSended);
  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleSendEmail = (formValue) => {
    console.log(formValue);
    global.yEmail = formValue;
    const { email } = formValue;
    //console.log(EmailSended)
    setLoading(true);
    dispatch(sendEmail({ email }))
      .unwrap()
      .then(() => {
        setOpen(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // const myemail=JSON.stringify(global.yEmail)
  // console.log(myemail)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationEmail,
    onSubmit: (event) => {
      handleSendEmail(event);
    },
  });

  //  if (EmailSended) {
  //     console.log("EmailSended")
  //     setOpen(true)
  //      navigate("/sendcode")
  //   }

  return (
    <div className="wrapper">
      <div className="fon_bg">
        <img src={logo} alt="logo" className="logo_style" />

        <div className="png">
          <img src={doc} alt="doc" />
        </div>
      </div>
      <div className="form__wrapper">
        <h1 className="forgot__title">Забыли пароль ? </h1>
        <form onSubmit={formik.handleSubmit}>
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
              marginTop: "100px",
            }}
          />
          <ColorButton
            onClick={formik.handleChange}
            variant="contained"
            type="submit"
            sx={{ textTransform: "none", marginTop: "100px" }}
          >
            Получить код
          </ColorButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={mod_style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "#4A5466" }}
              >
                На ваш адрес электронной почты {currentEmail}
                был отправлен код подтверждения
              </Typography>

              <button
                onClick={() => navigate("/sendcode")}
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
                Ok
              </button>
            </Box>
          </Modal>
        </form>
      </div>
    </div>
  );
}
