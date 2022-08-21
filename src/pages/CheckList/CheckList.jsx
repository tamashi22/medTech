import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import checklist from "../../images/checklist.png";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import "./Check.css";
import { getPatients } from "../../redux/slices/base";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAnalizes,
  getPatientVisitsByPatientId,
} from "../../redux/slices/checkList";
import { getBasicQuestions } from "../../redux/slices/checkList";
import obsled from "../../images/obsled.png";
import question from "../../images/question.png";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Button } from "@mui/material";
import plus from "../../images/plus.png";
import { AddNewItemButton } from "../../constance/css__const";
import lab from "../../images/lab.png";
import drugs from "../../images/drugs.png";
import drugAdo from "../../images/drugAdo.png";
import { Switch } from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@emotion/react";
import dop from "../../images/dop.png"
import end from "../../images/end.png"
import naznach from "../../images/naznach.png"
function CheckList() {
  const dispach = useDispatch();
  const [active, setActive] = useState(false);
  const [patientId, setPatientId] = useState();
  console.log("patientId", patientId);
  const [answer, setAnswer] = useState();
  const [patientVisit, setPatientVisit] = useState();
  console.log("patientVisit", patientVisit);

  const patient = useSelector((state) => state.table.patients);
  const patients = patient ? patient.patients : [];
  const patientVisits = useSelector(
    (state) => state.checklist.PatientVisitsByPatientId
  );
  const questions = useSelector((state) => state.checklist.Questions);
  const analyzes = useSelector((state) => state.checklist.Analizes);
  console.log(analyzes);
  console.log(questions);
  //console.log(patients);

  const handleActive = (event) => {
    event.preventDefault();
    active ? setActive(false) : setActive(true);
  };



  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    dispach(getPatients());
  }, []);

  useEffect(() => {
    dispach(getBasicQuestions());
  }, []);

  useEffect(() => {
    dispach(getAnalizes());
  }, []);

  useEffect(() => {
    patientId
      ? dispach(getPatientVisitsByPatientId({ id: patientId }))
      : console.log("gfd");
  }, [patientId]);
  const theme = useTheme();
  return (
    <div className="wrapper7">
      <Header>
        <div className="checkHead">
          <img className="checkImg" src={checklist}></img>
          <p className="checkTitle">Чек-листы</p>
        </div>
      </Header>
      <div className="checkMain">
        <div className="checkWrapper">
          <div className="cHead">
            <p className="cTitle">Создание чек-листа</p>
          </div>
          <div className="checkBody">
            <form>
              <p className="checkP">Поиск пациента</p>

              <Autocomplete
                disablePortal
                options={patients}
                sx={{ width: "400px" }}
                getOptionLabel={(option) =>
                  option.user.lastName +
                  " " +
                  option.user.firstName +
                  " " +
                  option.user.middleName
                }
                renderInput={(params) => <TextField {...params} />}
                onChange={(a, b) => (b ? setPatientId(b.id) : null)}
              ></Autocomplete>
              <p className="checkP">Дата Приема</p>

              <Autocomplete
                disablePortal
                disabled={patientId ? false : true}
                options={patientVisits}
                sx={{ width: "400px" }}
                getOptionLabel={(option) => option.dateVisit}
                renderInput={(params) => <TextField {...params} />}
                onChange={(a, b) => (b ? setPatientVisit(b.dateVisit) : null)}
              ></Autocomplete>

              <div className="checkPwrapper">
                <p className="checkP">Обследование</p>
                <img src={obsled}></img>
              </div>
              <div className="checkQuetions">
                {questions
                  ? questions.map((item) => {
                      return (
                        <div>
                        <div className="qustionItem" key={item.id}>
                          <div className="quetionPart">
                            <img src={question}></img>
                            <p className="questionP">{item.questionString}</p>
                          </div>
                          
                          <div>
                            <Switch></Switch>
                          </div>
                          
                        </div>
                        <TextField sx={{width:"600px"}}
                        label="Ответ"> </TextField>
                        </div>
                      );
                    })
                  : null}
                <AddNewItemButton variant="contained">
                  <p>Добавить вопрос</p>
                  <img src={plus}></img>
                </AddNewItemButton>
              </div>
              <div className="checkPwrapper">
                <p className="checkP">
                  Профилактические мероприятия; Лекарственные средства
                </p>
                <img src={drugs}></img>
              </div>
              <div className="grugsInputs">
                <div className="InputContainer">
                  <TextField
                    label="Название лекарства"
                    sx={{ width: "500px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img src={drugAdo}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Рецепт применения"
                    sx={{ width: "500px" }}
                  />
                </div>
                <div className="InputContainer">
                  <TextField
                    label="Название лекарства"
                    sx={{ width: "500px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img src={drugAdo}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Рецепт применения"
                    sx={{ width: "500px" }}
                  />
                </div>
                <AddNewItemButton variant="contained">
                  <p>Добавить лекарство</p>
                  <img src={plus}></img>
                </AddNewItemButton>
              </div>

              <div className="checkPwrapper">
                <p className="checkP">Назначения лабораторных исследований</p>
                <img src={lab}></img>
              </div>
              <div className="selectAnalizes">
                {/* {analyzes?
                  analyzes.map((item) => {
                    return (
                      
                      <button  key={item.id}className={active?"AnalizButtonActive":"AnalizButton"}
                        onClick={handleActive}
                      >
                        {item.analysisString}
                        </button>
                       
                        
                    )}):console.log("lol")} */}
                <Select
                sx={{width:"600px"}}
                  
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  
                >
                  {analyzes?analyzes.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name.analysisString}
                      
                    >
                      {name.analysisString}
                    </MenuItem>
                  )):null}
                </Select>
                <AddNewItemButton variant="contained">
                  <p>Добавить назначение</p>
                  <img src={plus}></img>
                </AddNewItemButton>
              </div>
              <div className="checkPwrapper">
                <p className="checkP">Дополнительные назначения</p>
                <img src={dop}></img>
              </div>
              <div className="InputContainer">
              <TextField
                    label="Назначение"
                    sx={{ width: "500px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img src={naznach}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Назначение"
                    sx={{ width: "500px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img src={naznach}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
              </div>
              <TextField
                    label="Назначение"
                    sx={{ width: "500px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <img src={naznach}></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <AddNewItemButton variant="contained">
                  <p>Добавить назначение</p>
                  <img src={plus}></img>
                </AddNewItemButton>
                <div className="checkPwrapper">
                <p className="checkP">Заключение</p>
                <img src={end}></img>
              </div>
              <TextField
                    label="Введите текст..."
                    multiline
                    sx={{ width: "1000px", marginRight: "20px" }}
                    InputProps={{
                      endAdornment: ( 
                        <InputAdornment position="end">
                          <img src={end}></img>
                        </InputAdornment>
                      ),
                      
                     
                    }}
                  />
                  <div>
                  <Button variant="contained"sx={{marginTop:"20px"}}>
                  сохранить
                  
                </Button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckList;
