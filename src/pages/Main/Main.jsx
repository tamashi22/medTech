import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import ProfilePage from "../Profile/ProfilePage";
import DataBase from "../DataBase/DataBase";
import ShedulePage from "../Shedule/ShedulePage";
import "./Main.css";
import { useSelector } from "react-redux";
import { DoctorsTable } from "../../components/DoctorsTable";
import { PatientTable } from "../../components/PatientsTable";
import DoctorProfile from "../Profile/DoctorProfile";
import PatientProfile from "../Profile/PatientProfile";
import CheckList from "../CheckList/CheckList";
import AdminPanel from "../AdminPanel/AdminPanel";
import PatientChekList from "../CheckList/PatientChekList";
import Survey from "../CheckList/PartsOfCheclist/Survey";
import Analyses from "../CheckList/PartsOfCheclist/Analyses";
import Drugs from "../CheckList/PartsOfCheclist/Drugs";
import Additional from "../CheckList/PartsOfCheclist/Additional";
import Conclusion from "../CheckList/PartsOfCheclist/Conclusion";

const Main = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  });
  const { userId } = useParams();
  return (
    <div className="main">
      <SideBar />
      <Routes>
        <Route exact path={"main"} element={<ShedulePage />} />
        <Route path={"profile"} element={<ProfilePage />} />
        <Route path={"shedule"} element={<ShedulePage />} />
        <Route path="base/*" element={<DataBase />}>
          <Route index element={<PatientTable />} />
          <Route path="patients" element={<PatientTable />} />
          <Route path="doctors" element={<DoctorsTable />} />
        </Route>
        <Route path="checkList" element={<CheckList />} />
        <Route path="adminPanel" element={<AdminPanel />} />
        <Route path={`doctorProfile/:id`} element={<DoctorProfile />} />
        <Route path={`patientProfile/:id`} element={<PatientProfile />} />
        <Route path={`patientCheckList/:id/*`} element={<PatientChekList/>}/>
        <Route path={`survey/:id`} element ={<Survey/>}/>
        <Route path={`analyses/:id`} element ={<Analyses/>}/>
        <Route path={`drugs/:id`} element ={<Drugs/>}/>
        <Route path={`additional/:id`} element ={<Additional/>}/>
        <Route path={`conclusion/:id`} element ={<Conclusion/>}/>
        </Routes>
      
    </div>
  );
};

export default Main;
