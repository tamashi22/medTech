import React, { useState, useEffect } from "react";
import "../../styles/profilesStyles.css";
import Header from "../../components/Header";
import profileIco from "../../images/profileIco.png";
import { SubHead } from "../../components/SubHead";
import { Link } from "react-router-dom";
import Vector from "../../images/Vector.svg";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPatientByPatientId } from "../../redux/slices/patients";
import { getPatientVisitsByPatientId } from "../../redux/slices/patients";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import def from "../../images/defaultPatient.jpg"
import moment from "moment";
import "moment/locale/ru";
import next from "../../images/nextBlue.png"
import historyVisit from "../../images/historyVisit.png"
import dow from "../../images/dow.png"
import MedCard from "../../components/MedCard";
var today = moment();
moment.locale("ru");

const PatientProfile = () => {
  const [Image, setImage] = useState(patient ? patient.imageUrl : null);
  const [changeImg, setChangeImg] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const patient = useSelector((state) => state.patient.currentPatient);
  const patientVisits=useSelector((state)=>state.patient.currentPatientVisits)
  const patientInfo = patient ? patient : [];
  const patientAva = patient ? patient.imageUrl : def;
  const handleChangeImg = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const myData=[]
  useEffect(() => {
    dispatch(getPatientByPatientId({ id }));
  }, []);
  useEffect(() => {
    
    dispatch(getPatientVisitsByPatientId({ id}))
    
  }, []);


  const downloadEmployeeData = () => {
		fetch(`https://medtech-team5.herokuapp.com/api/v1/word/${id}`)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'medCard.docx';
					a.click();
				});
				//window.location.href = response.url;
		});
	}


  const formik = useFormik({
    initialValues: {
      userDTO: {
        firstName: patient ? patient.userDTO.firstName : "",
        lastName: patient ? patient.userDTO.lastName : "",
        middleName: patient ? patient.userDTO.middleName : "",
        dob: patient ? patient.userDTO.dob : "",
        gender: "FEMALE",
        city: patient ? patient.userDTO.city : "",
        address: patient ? patient.userDTO.address : "",
        phoneNumber: patient ? patient.userDTO.phoneNumber : "",
        email: patient ? patient.userDTO.email : "",
        roles: ["ROLE_PATIENT"],
      },
      startOfPregnancy: patient ? patient.startOfPregnancy : "",
      pregnancyNumber: patient ? patient.pregnancyNumber : "",
    },
    enableReinitialize: true,
    // validationSchema: validationEmail,
    onSubmit: (event) => {
      handleChangePatient(event);
    },
  });
  const handleChangePatient = (formValue) => {
    console.log(formValue);
  };
  return (
    <div className="wrapper7">
      <div className="patient__head">
        <img src={profileIco}></img>
        <p className="user_name">
          {patient
            ? patient.userDTO.lastName +
              " " +
              patient.userDTO.firstName +
              " " +
              patient.userDTO.middleName
            : "ФИО"}
        </p>
      </div>

      <SubHead>
        <div style={{ display: "flex" }}>
          <Link to="/base" className="sublink">
            Пациеты
          </Link>
          <img src={Vector} className="SubVec"></img>
          <p className="sublabel">Профиль пациента</p>
        </div>
        <button  className="dowloadBtn" href="#" onClick={downloadEmployeeData}><img src={dow}></img>   Скачать медкарту</button>
      </SubHead>

      <form onSubmit={formik.handleSubmit}>
        <div className="profile">
          <div style={{ display: "flex", marginTop: "40px" }}>
            <div className="leftDiv">
              <img src={Image ? Image : patientAva} className="clientAva"></img>
              <input type="file" className="chooseimg"onChange={handleChangeImg} />

              <div className="patientName1">
                <TextField
                  name="userDTO.lastName"
                  type="text"
                  label="Фамилия"
                  variant="standard"
                  sx={{ width: "150px", marginRight: "5px" }}
                  inputProps={{ style: { fontSize: 24 ,textAlign:"center"} }}
                  onChange={formik.handleChange}
                  value={formik.values.userDTO.lastName}
                ></TextField>

                <TextField
                  name="userDTO.firstName"
                  type="text"
                  label="Имя"
                  variant="standard"
                  sx={{ width: "150px" }}
                  inputProps={{ style: { fontSize: 24,textAlign:"center" } }}
                  onChange={formik.handleChange}
                  value={formik.values.userDTO.firstName}
                ></TextField>
              </div>
              <TextField
                name="userDTO.middleName"
                type="text"
                label="Отчество"
                variant="standard"
                sx={{ width: "200px",marginTop:"10px" }}
                inputProps={{ style: { fontSize: 24,textAlign:"center" } }}
                onChange={formik.handleChange}
                value={formik.values.userDTO.middleName}
              ></TextField>
              <TextField
                name="userDTO.email"
                type="text"
                label="Email"
                variant="standard"
                sx={{ width: "200px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {color:"#92AFDC",textAlign:"center"}}}
                onChange={formik.handleChange}
                value={formik.values.userDTO.email}
              ></TextField>
              <p className="srock">{today.diff(patient?patient.startOfPregnancy:"", "week") + 1}-я </p>
              <p className="srock">Неделя</p>
            </div>
            <div className="rightDiv">
              <div className="flexInput">
            
              <TextField
                name="userDTO.city"
                type="text"
                label="Город/Населенный пункт"
                variant="standard"
                sx={{ width: "300px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                onChange={formik.handleChange}
                value={formik.values.userDTO.city}
              ></TextField>
              <TextField
                name="userDTO.adress"
                type="text"
                label="Адрес проживания"
                variant="standard"
                sx={{ width: "300px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                onChange={formik.handleChange}
                value={formik.values.userDTO.address}
              ></TextField>
              </div>
              <div className="flexInput">
              <TextField
                name="userDTO.phoneNumber"
                type="text"
                label="Номер телефона"
                variant="standard"
                sx={{ width: "300px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                onChange={formik.handleChange}
                value={formik.values.userDTO.phoneNumber}

              ></TextField>
              <TextField
                name="userDTO.dob"
                type="text"
                label="Дата Рождения"
                variant="standard"
                sx={{ width: "300px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                onChange={formik.handleChange}
                value={formik.values.userDTO.dob}
                
              ></TextField>
              
              </div>
              <TextField
                
                type="text"
                label="Доктор"
                variant="standard"
                sx={{ width: "600px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                disabled
                value={patient?patient.doctorDTO.userDTO.lastName+" "+patient.doctorDTO.userDTO.firstName+" "+patient.doctorDTO.userDTO.middleName:""}
                
              ></TextField>
              <TextField
                name="startOfPregnancy"
                type="text"
                label="Дата начала беременности"
                variant="standard"
                sx={{ width: "300px",marginBottom:"30px",marginTop:"15px" }}
                inputProps={{ style: {fontSize:"20px"}}}
                onChange={formik.handleChange}
                value={formik.values.startOfPregnancy}
                
              ></TextField>
              <div className="SubmitBtn">
              <Button type="submit" variant="contained" sx={{alignSelf:"flex-end"}}>Сохранить изменения</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="wrapProfile">
        
      <div className="VisitsHistory">

      <div className="visitsNav">История посещений
            <img src={historyVisit}></img>
      </div>
      <div className="visitsList">
          {patientVisits?
            myData
           .concat(patientVisits)
           .sort((a, b) =>
             a.dateVisit > b.dateVisit ? 1 : -1
           )
           .map((item, i) => {
             return (
        <div className="visitListItem"key={i}>
            <div className="flexdiv1">
            {item.dateVisit>today? "Запись назначена":i+1+"-й" +" визит"}
            </div>
            <div className="flexdiv2">
              {item.dateVisit}
            </div>
            <div className="flexdiv2">
            {moment(item.visitStartTime, "HH:mm:ss").format("HH:mm")}-{moment(item.visitEndTime, "HH:mm:ss").format("HH:mm")}
            </div>
            <div className="flexdiv3">
            
              <p className="linkstyle">Перейти к чеклисту </p>
              <Link to={`/patientCheckList/${item.id}`}>
              <img src={next} className="linkIco"></img>
              </Link>
            </div>
        </div>)}):<div className="noneDiv"><h2>Нет записей</h2></div>}
      </div>
      </div>
      </div>
      <MedCard patientId={id}/>
    </div>
  );
};

export default PatientProfile;
