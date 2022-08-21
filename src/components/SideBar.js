import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/auth";
import "../styles/side.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import main from "../images/main.png";
import { Route, Routes, Link } from "react-router-dom";
import check from "../images/Check.png";
import shed from "../images/shed.png";
import out from "../images/out.png";
import data from "../images/database.png";
import { getDoctorById } from "../redux/slices/doctor";
import logo from "../images/MedTech.png";
import DefaultImg from "../images/defaultDoc.jpg";
const drawerWidth = 120;
function SideBar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const currentDoctor = useSelector((state) => state.doctor.doctorData);
  const userId = currentUser.id;
  const roles = currentUser ? currentUser.roles : null;
  console.log(roles);
  console.log(roles == "ROLE_DOCTOR");
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  if (roles == "ROLE_DOCTOR") {
    useEffect(() => {
      dispatch(getDoctorById({ id: userId }));
    }, []);
  }
  return (
    <div className="side__wrapper">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: "1",
          }}
        >
          <div>
            {roles == "ROLE_ADMIN" ? (
              <List>
                <Link to={"/adminPanel"}>
                  <ListItem key="1" disablePadding>
                    <ListItemButton sx={{ height: "84px" }}>
                      <ListItemIcon sx={{ paddingLeft: "30px" }}>
                        <img src={main} />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            ) : null}
            <List>
              <Link to={"/checkList"}>
                <ListItem key="1" disablePadding>
                  <ListItemButton sx={{ height: "84px" }}>
                    <ListItemIcon sx={{ paddingLeft: "30px" }}>
                      <img src={check} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <List>
              <Link to={"/shedule"}>
                <ListItem key="1" disablePadding>
                  <ListItemButton sx={{ height: "84px" }}>
                    <ListItemIcon sx={{ paddingLeft: "30px" }}>
                      <img src={shed} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <List>
              <Link to={"/base"}>
                <ListItem key="1" disablePadding>
                  <ListItemButton sx={{ height: "84px" }}>
                    <ListItemIcon sx={{ paddingLeft: "30px" }}>
                      <img src={data} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </div>
          <div style={{ marginBottom: "20px" }}>
            {roles == "ROLE_DOCTOR" ? (
              <img
                src={currentDoctor ? currentDoctor.imageUrl : DefaultImg}
                className="sideImg"
              ></img>
            ) : null}
            <Link to={"/"} sx={{}}>
              <ListItemButton onClick={logOut}>
                <ListItemIcon sx={{ paddingLeft: "25px" }}>
                  <img src={out} />
                </ListItemIcon>
              </ListItemButton>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
