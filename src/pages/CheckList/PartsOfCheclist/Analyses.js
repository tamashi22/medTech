import React from "react";
import check from "../../../images/checklist.png";
import Vector from "../../../images/Vector.svg";
import { Link } from "react-router-dom";
import { SubHead } from "../../../components/SubHead";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChecklistByPatientVisitId } from "../../../redux/slices/checkList";
import { useEffect, useState } from "react";
import def from "../../../images/defaultDoc.jpg";
import { Autocomplete, Button, TextField } from "@mui/material";
import ques from "../../../images/question.png";
import { InputAdornment } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
function Analyses() {
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
  return (
    <div className="wrapper7">
      <div>
        <div className="header">
          <div className="lefthead">
            <img src={check} alt="ckeck" />
            <p className="head__title">
              {checkListData
                ? checkListData[0].patientVisitDTO.patientDTO.userDTO.lastName +
                  " " +
                  checkListData[0].patientVisitDTO.patientDTO.userDTO
                    .firstName +
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
            <p className="sublabel">Назначение лабораторных исследований</p>
          </div>
        </SubHead>
      </div>
      {/*  */}
      <div className="ChecklistMain">
        <div className="doctorCard">
          <div className="baseInfo">
            <img
              className="doctorpic"
              src={
                checkListData
                  ? checkListData[0].patientVisitDTO.doctorDTO.imageUrl
                  : def
              }
            ></img>
            <div className="basicInfo">
              <p className="nameLabel">
                {checkListData
                  ? checkListData[0].patientVisitDTO.doctorDTO.userDTO
                      .lastName +
                    " " +
                    checkListData[0].patientVisitDTO.doctorDTO.userDTO
                      .firstName +
                    " " +
                    checkListData[0].patientVisitDTO.doctorDTO.userDTO
                      .middleName
                  : ""}
              </p>
              <p className="emailLabel">
                {checkListData
                  ? checkListData[0].patientVisitDTO.doctorDTO.userDTO.email
                  : ""}
              </p>
            </div>
          </div>
          <div className="docCardFlexDiv">
            {checkListData
              ? checkListData[0].patientVisitDTO.doctorDTO.userDTO.phoneNumber
              : ""}
          </div>
          <div className="docCardFlexDiv">
            {checkListData
              ? checkListData[0].patientVisitDTO.doctorDTO.profession
              : ""}
          </div>
        </div>
        <div className="analiztWrapper">
          {checkListData
            ? checkListData[0].analyzes.map((item, i) => {
                return (
                  <div className="analyses" key={i}>
                    <div>
                      <TextField
                        variant="standard"
                        defaultValue={item.analysisString}
                        inputProps={{ style: { fontSize: 20 } }}
                        sx={{ width: "400px" }}
                      ></TextField>
                    </div>
                    <div className="activeBtns">
                      <IconButton size="large"
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <SaveIcon size="large"/>
                      </IconButton>
                      <IconButton size="large"
                        color="error"
                        aria-label="add to shopping cart"
                      >
                        <Delete size="large"/>
                      </IconButton>
                    </div>
                    
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Analyses;
