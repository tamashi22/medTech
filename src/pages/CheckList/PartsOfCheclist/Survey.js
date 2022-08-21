import React from "react";
import check from "../../../images/checklist.png";
import Vector from "../../../images/Vector.svg";
import { Link } from "react-router-dom";
import { SubHead } from "../../../components/SubHead";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChecklistByPatientVisitId } from "../../../redux/slices/checkList";
import { useEffect,useState } from "react";
import def from "../../../images/defaultDoc.jpg"
import { Autocomplete,Button,TextField } from "@mui/material";
import ques from "../../../images/question.png"
import { InputAdornment } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import { getAnswerByQuestionId } from "../../../redux/slices/checkList";
function Survey() {
    //
  const { id } = useParams();
  console.log("visitID", id);
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getChecklistByPatientVisitId({ id }));
  }, []);
  const checkListData = useSelector(
    (state) => state.checklist.currentChecklist
  );
  console.log("grg", checkListData ? checkListData[0] : "");
  const UserId = checkListData
    ? checkListData[0].patientVisitDTO.patientDTO.userDTO.id
    : " ";
  console.log("userId", UserId);
  //
  const checkId =checkListData?checkListData[0].id:""
  console.log("checkId", checkId)
  const quetions= checkListData?checkListData[0].basic_questions:""
    console.log("q",quetions)
    const [question, setQuestion] = useState();
    console.log( "qid",question)
    useEffect(() => {
        question&&checkId?
        dispach(getAnswerByQuestionId({ id:question,checklistId:checkId })):
        console.log("none")
      }, [question]);
      const answerStr=useSelector((state)=>state.checklist.Answer)
  return (
    <div className="wrapper7">
    <div>
      <div className="header">
        <div className="lefthead">
          <img src={check} alt="ckeck" />
          <p className="head__title">
            {checkListData
              ? checkListData[0].patientVisitDTO.patientDTO.userDTO
                  .lastName +
                " " +
                checkListData[0].patientVisitDTO.patientDTO.userDTO.firstName +
                " " +
                checkListData[0].patientVisitDTO.patientDTO.userDTO.middleName
              : ""}
          </p>
        </div>
      </div>
      <SubHead>
        <div style={{ display: "flex" }}>
          <Link to={`/patientCheckList/${id}`} className="sublink">
            Чек листы
          </Link>
          <img src={Vector} className="SubVec"></img>
          <p className="sublabel">Обследование</p>
        </div>
      </SubHead>
      </div>
      {/*  */}
      <div className="ChecklistMain">
      <div className="doctorCard">
                <div className="baseInfo">
                    <img  className="doctorpic"src={checkListData?checkListData[0].patientVisitDTO.doctorDTO.imageUrl:def}></img>
                    <div className="basicInfo">
                        <p className="nameLabel">{checkListData ? checkListData[0].patientVisitDTO.doctorDTO.userDTO.lastName+" "+checkListData[0].patientVisitDTO.doctorDTO.userDTO.firstName+" "+checkListData[0].patientVisitDTO.doctorDTO.userDTO.middleName:""}</p>
                        <p className="emailLabel">{checkListData ? checkListData[0].patientVisitDTO.doctorDTO.userDTO.email:""}</p>
                    </div>
                </div>
                <div className="docCardFlexDiv">
                    {checkListData ? checkListData[0].patientVisitDTO.doctorDTO.userDTO.phoneNumber:""}
                </div>
                <div className="docCardFlexDiv">
                    {checkListData ? checkListData[0].patientVisitDTO.doctorDTO.profession:""}
                </div>
                </div>
                {/*  */}
                <div className="partWrapper">
                    <div className="partHead">
                        Обследование
                    </div>
                    <div className="partBody">
                    <Autocomplete
                disablePortal
                
                options={quetions}
                sx={{ width: "800px" }}
                getOptionLabel={(option) => option.questionString}
                renderInput={(params) => <TextField {...params} />}
                onChange={(a, b) => (b ? setQuestion(b.id) : null)}
              ></Autocomplete>
              <div className="Answer"></div>
                {question?
                <div>
                <TextField  sx={{width:"700px"}}label="Введите для измнения текушего вопроса "
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <img src={ques}></img>
                      </InputAdornment> 
                    ),
                  }}
                ></TextField>
                <div style={{marginTop:"30px"}}>
                <TextField
                
                    multiline={true}
                    rows={3}
                    sx={{width:"500px"}}
                    defaultValue={answerStr?answerStr[0].answerString :""}
                    >
                
                    
                </TextField>
                <p> Cтатус ответа:</p>
                <Select
                sx={{width:"100px"}}
                label="статус ответа:"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={answerStr?answerStr[0].answerStatus :""} 
               
                
        >
          <MenuItem value={true}>Да</MenuItem>
          <MenuItem value={false}>Нет</MenuItem>
          
        </Select>
                </div>
                <div className="GroupBtn">
                    <Button variant="outlined"  endIcon={<SaveIcon />}
                    sx={{marginRight:"10px"}}>
                            Сохранить изменения
                    </Button>
                    <Button variant="outlined"  color="error" endIcon={<Delete />}>
                            Удалить вопрос  
                    </Button>
                </div>
                </div>
                :<div>Выберите Вопрос</div>}
                    </div>
                </div>
      </div>

                



      </div>
  )
}

export default Survey;
