import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {  ColorButton } from "../../constance/css__const";
import { CodeText } from "../../constance/css__const";
import doc from "../../images/newPic.png";
import logo from "../../images/newLogo.png";
import {  useFormik } from "formik";
import { sendCode } from "../../redux/slices/auth";
import { sendEmail } from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { validationCode } from "../../utils/validations/validationLogin";
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
const SendCode = () => {
  const [loading, setLoading] = useState(false);
  const { CodeSended } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const currentEmail = useSelector((state) => state.auth.currentEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  // const props = {
  //   type: 'number',
  //   onchange: (e)=>console.log(e),
  //     inputStyle: {

  //       margin:  '4px',
  //       borderBottom: "2px solid ",
  //       borderTop:"none",
  //       borderLeft:"none",
  //       borderRight:"none",
  //       width: '46px',
  //       fontSize: '20px'  ,
  //       height: '46px',
  //       textAlign:"center",
  //       overflow:"hidden",
  //       borderColor:"#A096A7"
  //     },
  //     inputStyleInvalid: {
  //       fontFamily: 'monospace',
  //       margin:  '4px',
  //       MozAppearance: 'textfield',
  //       border: '1px solid red'
  //     },
  // }
  //поработать
  // const [counter, setCounter] = React.useState(60);
  // React.useEffect(() => {
  //     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  //   }, [counter]);
  const handSendCode = (formValue) => {
    const { code } = formValue;
    console.log(formValue);
    setLoading(true);
    dispatch(sendCode({ code }))
      .then(() => {
        setOpen(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationCode,
    onSubmit: (event) => {
      handSendCode(event);
    },
  });
  // if (CodeSended) {
  //   return navigate("/changepassword")
  // }
  const resend = () => {
    console.log({ email: currentEmail });
    dispatch(sendEmail({ email: currentEmail }));
  };

  return (
    <div className="wrapper">
      <div className="fon_bg">
        <img src={logo} alt="logo" className="logo_style" />

        <div className="png">
          <img src={doc} alt="doc" />
        </div>
      </div>
      <div className="form__wrapper">
        <p className="sendcode__title">Проверка</p>
        <p>Проверьте сообщение, которое мы вам отправили</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="code">
            <p style={{ marginBottom: 0 }}>Код подтверждения</p>

            <CodeText
              inputProps={{ maxLength: 6 }}
              id="code"
              name="code"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ marginLeft: "50px", marginTop: "50px" }}
            />
            <div className="dash"></div>

            {/* <ReactCodeInput  fields={6} {...props}  
             value={formik.values.code}
             id="code"
             name="code"  
             onChange={(e)=>console.log(e)}
              touch={formik.errors.code}
           /> */}
            {/* {formik.errors.code && formik.touched.code ? (
             <div>{formik.errors.code}</div>
           ) : null} */}
          </div>
          <ColorButton
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",

              marginBottom: "20px",
            }}
          >
            Войти
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
                Код подтвержден !
              </Typography>

              <button
                onClick={() => navigate("/changepassword")}
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
        <ColorButton className="resend" onClick={() => resend()}>
          Отправить повторносек.
        </ColorButton>
      </div>
    </div>
  );
};
export default SendCode;
