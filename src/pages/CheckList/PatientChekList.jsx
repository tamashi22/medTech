import React, { useEffect } from "react";
import conc from "../../images/conc.png";
import dopN from "../../images/dopN.png";
import obs from "../../images/obs.png";
import ana from "../../images/ana.png";
import dr from "../../images/dr.png";
//Basic
import check from "../../images/checklist.png";
import Vector from "../../images/Vector.svg";
import { Link } from "react-router-dom";
import { SubHead } from "../../components/SubHead";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getChecklistByPatientVisitId } from "../../redux/slices/checkList";
function PatientChekList() {
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
  return (
    //too
    <div className="wrapper7">
      <div>
        <div className="header">
          <div className="lefthead">
            <img src={check} alt="ckeck" />
            <p className="head__title">
              {checkListData
                ? checkListData[0].patientVisitDTO.patientDTO.userDTO
                    .firstName +
                  " " +
                  checkListData[0].patientVisitDTO.patientDTO.userDTO.lastName +
                  " " +
                  checkListData[0].patientVisitDTO.patientDTO.userDTO.middleName
                : ""}
            </p>
          </div>
        </div>
        <SubHead>
          <div style={{ display: "flex" }}>
            <Link to={`/patientProfile/${UserId}`} className="sublink">
              Профиль пациента
            </Link>
            <img src={Vector} className="SubVec"></img>
            <p className="sublabel">Чек листы</p>
          </div>
        </SubHead>
        {/*  */}
        <div className="ButtonsWrapper">
          <Link to={`/survey/${id}`} style={{ textDecoration: "none" }}>
            <div className="buttonItem">
              <img src={obs}></img>
              <p className="checkLabel">Обследование</p>
            </div>
          </Link>
          <Link to={`/analyses/${id}`} style={{ textDecoration: "none" }}>
            <div className="buttonItem">
              <img src={ana}></img>
              <p className="checkLabel">Назначения лабораторных исследований</p>
            </div>
          </Link>
          <Link to={`/drugs/${id}`} style={{ textDecoration: "none" }}>
            <div className="buttonItem">
              <img src={dr}></img>
              <p className="checkLabel">Профилактические мероприятия</p>
            </div>
          </Link>
          <Link to={`/additional/${id}`} style={{ textDecoration: "none" }}>
            <div className="buttonItem">
              <img src={dopN}></img>
              <p className="checkLabel">Дополнительные назначения</p>
            </div>
          </Link>
          <Link to={`/conclusion/${id}`} style={{ textDecoration: "none" }}>
            <div className="buttonItem">
              <img src={conc}></img>
              <p className="checkLabel">Заключение</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientChekList;
