import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import "./sheduleStyles.css";
import calendar from "../../images/Calendar.png";
import Add from "../../components/Add";
import Calendar from "react-calendar";
import "./calendar.css";
import Next from "../../images/Next.svg";
import Prev from "../../images/Prev.svg";
import { useDispatch } from "react-redux";
import { getDoctors } from "../../redux/slices/base";
import { useSelector } from "react-redux";
import { SearchInput } from "../../constance/css__const";
import { getDoctorById } from "../../redux/slices/doctor";
import defaultImg from "../../images/defaultDoc.jpg";
import { getPatientsVisitsByDoctorId } from "../../redux/slices/doctor";
import moment from "moment";
import "moment/locale/ru";
import { Box, Button, Modal, Typography } from "@mui/material";
import { AddnewUser } from "../../constance/css__const";
import add from "../../images/add.png";
import { mod_style } from "../../constance/css__const";
import closeIco from "../../images/closeIco.svg";
import { getAllDoctors } from "../../redux/slices/doctor";
import { getPatientsByDoctorId } from "../../redux/slices/doctor";
import { getDoctorSheduleByIdWeek } from "../../redux/slices/doctor";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { ToggleButton ,ToggleButtonGroup} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { nested_mod_style } from "../../constance/css__const";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import { ColorButton } from "../../constance/css__const";
import { useFormik } from "formik";
import {IncertPatientVisit} from "../../redux/slices/doctor";
const useStyles = makeStyles((theme) => ({
  toggleButton: {
    backgroundColor: 'blue',
    border: [10, 'solid', 'black'],
    padding: 10,
    boxShadow: [
      [0, 0, 0, 1, 'blue'],
    ],
  }
}));

export default function ShedulePage() {
  const doctor = useSelector((state) => state.table.doctors);
  const allDoctors = useSelector((state) => state.doctor.allDoctors);

  const doctorShedule =useSelector((state)=>state.doctor.doctorShedule)
  const isVisitCreacted = useSelector((state)=>state.doctor.isVisitCreated)
  console.log(doctorShedule)
  // !доделать
  const doctorPatients = useSelector((state) => state.doctor.patientsByDoctor);
  //console.log("patients",doctorPatients)
  const [datePick, setDatePick] = useState(null);

  const week=moment(datePick).day()
  
  
  //console.log("fds",allDoctors)
  const currentDoctor = useSelector((state) => state.doctor.doctorData);
  //for modal
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  console.log("doctorid", selectedOption);
  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const arr = allDoctors || [];
  //console.log(arr)
  const displayedOptions = useMemo(
    () =>
      arr.filter((option) =>
        containsText(
          option.userDTO.lastName &&
            option.userDTO.firstName &&
            option.userDTO.middleName,
          searchText
        )
      ),
    [searchText]
  );

  const [searchPatient, setSearchPatient] = useState("");
  const [selectPatient, setSelectPatient] = useState("");
  console.log("patientid", selectPatient);
  
  const patientArr = doctorPatients || [];
  const displayedPatients = useMemo(
    () =>
      patientArr.filter((option) =>
        containsText(
          option.userDTO.lastName &&
            option.userDTO.firstName &&
            option.userDTO.middleName,
          searchPatient
        )
      ),
    [searchPatient, patientArr]
  );
  const [alignment, setAlignment] = React.useState();

  const handleToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  console.log("time",alignment)
  const dispach = useDispatch();
  const [date, setDate] = useState(new Date());
  const [doc, setDoc] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const role = user ? user.roles : [];

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const doctors = doctor ? doctor : [];
  console.log("doc",doctors)
  const myData = [];
  const offset = date.getTimezoneOffset();
  const fg = new Date(date.getTime() - offset * 60 * 1000);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [openNestedModal, setNestedModal]=useState(false)
  const handleCloseNestedModal = () => setNestedModal(false);

  console.log("date",datePick)
  const formatedDate = fg.toISOString().split("T")[0];
  const classes = useStyles();
  const patietsVisits = useSelector(
    (state) => state.doctor.doctorPatientVisits
  );
  //console.log(currentDoctor)
    
  //console.log(patietsVisits);
  //console.log(formatedDate);
  // *doctorID
  console.log(doc.id);

  const getClickData = (clickedData) => {
    setDoc(clickedData);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = doctors.filter((item) => {
        return Object.values(item.userDTO)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(doctors);
    }
  };
  

  //! modal
  const handleAddVisit = () => {
    setOpen(true);
  };

  //
  useEffect(() => {
    dispach(getDoctors());
  }, []);
  useEffect(() => {
    dispach(getAllDoctors());
  }, []);


  role.includes("ROLE_ADMIN")?(
  useEffect(() => {
    selectedOption
      ? dispach(getPatientsByDoctorId({ id: selectedOption }))
      : console.log("none");
  }, [selectedOption])):(
    useEffect(() => {
      dispach(getPatientsByDoctorId({ id: user.id}))
    },[]))


  role.includes("ROLE_ADMIN")?(
  useEffect(()=>{
    selectedOption&&week?
    dispach(getDoctorSheduleByIdWeek({id:selectedOption,weekday:week}))
    :console.log("none");
  },[selectedOption,week])):(
    useEffect(()=>{
      
      dispach(getDoctorSheduleByIdWeek({id:user.id,weekday:week}))
      
    }, [week]))




  role.includes("ROLE_ADMIN")
    ? useEffect(() => {
        doc.id && formatedDate
          ? dispach(
              getPatientsVisitsByDoctorId({ id: doc.id, date: formatedDate })
            )
          : console.log("none");
      }, [doc.id, formatedDate])
    : useEffect(() => {
        dispach(getDoctorById({ id: user.id }));
        dispach(
          getPatientsVisitsByDoctorId({ id: user.id, date: formatedDate })
        );
      }, [formatedDate]);

      
      // const off = datePick?datePick.getTimezoneOffset():null;
      // const f = datePick? new Date(datePick.getTime() - off * 60 * 1000):null
      // const dateVisit = datePick? f.toISOString().split("T")[0]:null
      
      const formik = useFormik({  
      initialValues: {
          doctorId:role.includes("ROLE_ADMIN")?selectedOption:user.id,
          patientId:selectPatient,
          dateVisit: moment(datePick).format("YYYY-MM-DD"),
          visitStartTime: alignment
    },
    enableReinitialize: true,
    onSubmit: (event) => {
      handleIncertVisit(event);
    },
  });
  const handleIncertVisit = (formValue) => {
    console.log(formValue)
    dispach(IncertPatientVisit(formValue))
    .then(() => {
      setNestedModal(true);
    })
  }
      
  return (
    <div className="wrapper3">
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={calendar} className="mainImg"></img>
          <p className="pageTitle">Календарь</p>
        </div>
        <AddnewUser onClick={handleAddVisit}>
          
          <img src={add}></img>
        </AddnewUser>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={mod_style}>
            <div className="modHead">
              <p>Создать запись</p>
              <img src={closeIco} onClick={handleClose}></img>
            </div>
            <div className="modBody">

              <form className="modform" onSubmit={formik.handleSubmit}>
                {role.includes("ROLE_ADMIN")?(
                  <div>
              <label>Выберите Доктора</label>
              <Select
                id="doctorId"
                name="doctorId"
                sx={{
                  width: "300px",
                  alignSelf: "center",
                  marginBottom: "20px",
                }}
                // Disables auto focus on MenuItems and allows TextField to be in focus
                MenuProps={{ autoFocus: false }}
                
                value={selectedOption}
                placeholder="Выберите Доктора"
                onChange={(e) => setSelectedOption(e.target.value)}
                onClose={() => setSearchText("")}
                
                // This prevents rendering empty string in Select's value
                // if search text would exclude currently selected option.
              >
                {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                <ListSubheader>
                  <TextField
                    size="small"
                    // Autofocus on textfield
                    autoFocus
                    placeholder="Type to search..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        // Prevents autoselecting item while typing (default Select behaviour)
                        e.stopPropagation();
                      }
                    }}
                  />
                </ListSubheader>
                {displayedOptions.map((option, i) => (
                  <MenuItem key={i} value={option.id}>
                    {option.userDTO.lastName +
                      " " +
                      option.userDTO.firstName +
                      " " +
                      option.userDTO.middleName}
                  </MenuItem>
                ))}
              </Select>
              </div>
                ):(null)}
              <label>Выберите Пациента</label>
              <Select
              id="patientId"
              name="patientId"
                sx={{ width: "300px", alignSelf: "center" }}
                // Disables auto focus on MenuItems and allows TextField to be in focus
                MenuProps={{ autoFocus: false }}
                labelId="search-select-label"
                
                value={selectPatient}
                placeholder="Выберите Пациета"
                onChange={(e) => setSelectPatient(e.target.value)}
                onClose={() => setSearchPatient("")}
                // This prevents rendering empty string in Select's value
                // if search text would exclude currently selected option.
              >
                {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                <ListSubheader>
                  <TextField
                    size="small"
                    // Autofocus on textfield
                    autoFocus
                    placeholder="Type to search..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setSearchPatient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        // Prevents autoselecting item while typing (default Select behaviour)
                        e.stopPropagation();
                      }
                    }}
                  />
                </ListSubheader>
                {displayedPatients.map((option, i) => (
                  <MenuItem key={i} value={option.id}>
                    {option.userDTO.lastName +
                      " " +
                      option.userDTO.firstName +
                      " " +
                      option.userDTO.middleName}
                  </MenuItem>
                ))}
              </Select>
                      
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  id="dateVisit"
                  name="dateVisit"   
                  value={datePick}
                  onChange={(newValue) => setDatePick(newValue)}
                  renderInput={(params) => <TextField {...params}sx={{width:"300px" ,alignSelf:"center" ,marginTop:"20px",marginBottom:"20px"}} 
                      label="Выберите дату"
                  />}
                />
                
              </LocalizationProvider>
              <div className="chooseTime">
              
              <ToggleButtonGroup
              id="visitStartTime"
              name="visitStartTime"
                exclusive
                onChange={handleToggle}
                value={alignment}
                color="info"
    >           
              {doctorShedule ?doctorShedule.map((item,i) => {

                      return  (
                          

                            <ToggleButton  
                            
                            selected={moment(alignment, "HH:mm").format("HH:mm:ss")==item.scheduleStartTime?true:false}
                            value={moment(item.scheduleStartTime, "HH:mm:ss").format("HH:mm")} key={i}>{moment(item.scheduleStartTime, "HH:mm:ss").format("HH:mm")}</ToggleButton>

                      )}):null}
                      </ToggleButtonGroup> 
                      
              </div>
              <ColorButton sx={{width:"300px",alignSelf:'center',marginTop:'20px',color:"#FFF",borderRadius:"12px"}} type="submit">Создать запись</ColorButton>
              </form> 

              <Modal
              open={openNestedModal}
              onClose={handleCloseNestedModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={nested_mod_style}>
                {isVisitCreacted?
                <p>Запись успешно добавлена !</p>:
                <p>Произошла Ошибка: Данные введены неправильно!</p> }
              <Button onClick={handleCloseNestedModal}>Ok</Button>

              </Box>
                
              </Modal>


            </div>
          </Box>
        </Modal>
      </Header>
      <div className="calendarMain">
        <div className="leftSide">
          <div className="calendar">
            <div className="calendarHead">
              <p className="headTitle">Выбор месяца</p>
            </div>
            <div className="calendarBody">
              <Calendar
                onChange={setDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                nextLabel={<img src={Next}></img>}
                prevLabel={<img src={Prev}></img>}
              />
            </div>
          </div>
          {role.includes("ROLE_ADMIN") ? (
            <div className="doctorsList">
              <div className="calendarHead">
                <p className="headTitle">Другие Врачи</p>
              </div>

              <div className="searchDoc">
                <SearchInput
                  placeholder="Поиск"
                  sx={{ width: "100%", marginBottom: "10px" }}
                  onChange={(e) => searchItems(e.target.value)}
                ></SearchInput>
                  
                {searchInput.length > 1
                  ? filteredResults.map((item) => {
                      return (
                        <div
                          className="getlist"
                          key={item.id}
                          onClick={() => getClickData(item)}
                        >
                          <img
                            src={item.imageUrl ? item.imageUrl : defaultImg}
                            className="userAva"
                          ></img>
                          <p>
                            {item.userDTO.lastName +
                              " " +
                              item.userDTO.firstName +
                              " " +
                              item.userDTO.middleName}
                          </p>
                        </div>
                      );
                    })
                  : doctors
                  ? doctors.map((item) => {
                      return (
                        <div
                          className="getlist"
                          key={item.id}
                          onClick={() => getClickData(item)}
                        >
                          <img
                            src={item.imageUrl ? item.imageUrl : defaultImg}
                            className="userAva"
                          ></img>
                          <p>
                            {item.userDTO.lastName +
                              " " +
                              item.userDTO.firstName +
                              " " +
                              item.userDTO.middleName}
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : (
            console.log("i am doc")
          )}
        </div>
        <div className="rightSide">
          <div className="shedHead">
            {role.includes("ROLE_ADMIN") ? (
              <div className="userData">
                <img
                  className="userAva"
                  src={doc.imageUrl ? doc.imageUrl : defaultImg}
                ></img>
                <div className="doctorInfo">
                  <p className="doctorName">
                    {doc.user
                      ? doc.user.firstName +
                        " " +
                        doc.user.lastName +
                        " " +
                        doc.user.middleName
                      : "Фио Доктора"}
                  </p>
                  <p className="doctorProf">
                    {doc.profession ? doc.profession : "Проффессия"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="userData">
                <img
                  className="userAva"
                  src={currentDoctor ? currentDoctor.imageUrl : defaultImg}
                ></img>
                <div className="doctorInfo">
                  <p className="doctorName">
                    {user
                      ? user.firstName +
                        " " +
                        user.lastName +
                        " " +
                        user.middleName
                      : "Фио Доктора"}
                  </p>
                  <p className="doctorProf">
                    {currentDoctor ? currentDoctor.profession : "Проффессия"}
                  </p>
                </div>
              </div>
            )}
            <div className="choosenDate">{moment(date).format("MMM D")}</div>
          </div>
          <div className="shedBody">
            <p className="shedTitle">Записи на этот день:</p>
            {patietsVisits
              ? myData
                  .concat(patietsVisits)
                  .sort((a, b) =>
                    a.visitStartTime > b.visitStartTime ? 1 : -1
                  )
                  .map((item, i) => {
                    return (
                      <div className="shedItem" key={i}>
                        <p className="patientName">
                          {item.patientDTO.userDTO.lastName +
                            " " +
                            item.patientDTO.userDTO.firstName +
                            " " +
                            item.patientDTO.userDTO.middleName}
                        </p>
                        <div className="visitTimes">
                          <p className="visitTime">
                            Время начала приема:{" "}
                            {moment(item.visitStartTime, "HH:mm:ss").format(
                              "HH:mm"
                            )}
                          </p>
                          <p className="visitTime">
                            Время конца приема:{" "}
                            {moment(item.visitEndTime, "HH:mm:ss").format(
                              "HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
              : "Пожалуйста выберите дату и врача"}
          </div>
        </div>
      </div>
    </div>
  );
}
// {doc.user?doc.user.email:"Фио Доктора"}
{
  /* <div> Selected date: {date.toDateString()}</div> */
}
