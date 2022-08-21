import React, { useState, useEfect } from "react";
import base from "../../images/Base.png";
import "../../styles/base.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function DataBase() {
  const user = useSelector((state) => state.auth.user);
  const role = user ? user.roles : [];

  return (
    <div className="wrapper7">
      <div>
        <div className="header">
          <div className="lefthead">
            <img className="page__logo" src={base} alt="base" />
            <p className="head__title">База данных</p>
            <NavLink
              to="patients"
              className={({ isActive }) => (isActive ? "active" : "link1")}
            >
              Пациенты
            </NavLink>
            {role == "ROLE_ADMIN" ? (
              <NavLink
                to="doctors"
                className={({ isActive }) => (isActive ? "active" : "link1")}
              >
                Сотрудники
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default DataBase;
