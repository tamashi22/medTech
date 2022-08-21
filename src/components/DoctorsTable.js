import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "../redux/slices/base";
import Pphoto from "../images/Pphoto.png";
import "../styles/base.css";
import {
  DataGrid,
  ruRU,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { SubHead } from "./SubHead";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Pagination } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import profileLink from "../images/Vector.svg";
import { Link } from "react-router-dom";
import { AddnewUser } from "../constance/css__const";
import add from "../images/add.png";
import defaultIco from "../images/defaultDoc.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-row": {
      backgroundColor: "#ffff",
      marginBottom: "10px",
      border: "none",
      color: "#4A5466",
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      padding: 0,
    },
    "& .paxton-table--cell": {
      border: "none",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnsContainer": {
      border: "none",
    },
    // This is to fix the rows being cut off due to adding padding
    "& .MuiDataGrid-viewport": {
      maxHeight: "unset !important",
    },

    "& .MuiDataGrid-virtualScrollerContent": {
      paddingBottom: 50 * 2, // to compensate space between rows
      boxSizing: "content-box",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "16px",
    },
  },
}));
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
export const DoctorsTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 8,
  });

  const doctor = useSelector((state) => state.table.doctors);
  //console.log(doctor?doctor.doctors:[])
  const dispach = useDispatch();

  useEffect(() => {
    dispach(getDoctors());
  }, []);
  const doctors = doctor ? doctor : [];
  console.log(doctors);
  //colums for table>
  const columns = [
    {
      field: "imageUrl",
      headerName: "",
      flex: 1,
      maxWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {<img className="base_img" src={params.value?params.value:defaultIco}></img>}
          </div>
        );
      },
    },
    {
      field: "user",
      width: 250,
      headerName: "Базовая иноформация",
      flex: 2,
      valueGetter: (params) => params.row.userDTO.lastName,
      valueGetter: (params) => params.row.userDTO.email,
      valueGetter: (params) => params.row.userDTO.firstName,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="rowitem"
              style={{ color: "#141517", fontSize: "18px" }}
            >
              {params.row.userDTO.firstName +
                " " +
                params.row.userDTO.lastName +
                " " +
                params.row.userDTO.middleName +
                ""}
            </div>
            <div>{params.row.userDTO.email}</div>
          </div>
        );
      },
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email",
      valueGetter: (params) => params.row.userDTO.email,
      hide: true,
    },
    {
      field: "phoneNumber",
      headerName: "Номер телефона",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row.userDTO.phoneNumber,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.userDTO.phoneNumber}</div>;
      },
    },
    {
      field: "workExperience",
      headerName: "Стаж",
      flex: 1,
      maxWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="rowitem">{params.value}</div>;
      },
    },
    {
      field: "profession",
      headerName: "Профессия",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="rowitem">{params.value}</div>;
      },
    },

    {
      field: "phoneNumber1",
      headerName: "WhatsApp/Telegram",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row.userDTO.phoneNumber,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.userDTO.phoneNumber}</div>;
      },
    },

    {
      field: "actions",
      headerName: "",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <Link to={`/doctorProfile/${params.row.userDTO.id}`}>
              <img src={profileLink}></img>
            </Link>
          </div>
        );
      },
    },
  ];
  //colums for table/>
  const classes = useStyles();

  return (
    <div>
      <SubHead>
        <div className="countStyle">
          <p className="count">{doctor ? doctor.length : null}</p>
          <p>сотрудников</p>
        </div>
        <div>
          <AddnewUser
            sx={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <img src={add}></img>
          </AddnewUser>
        </div>
      </SubHead>
      <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          autoHeight
          className={classes.root}
          rows={doctors}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 25, 50]}
          components={{
            Toolbar: GridToolbar,
            //Pagination: CustomPagination,
            LoadingOverlay: LinearProgress,
          }}
          rowHeight={100}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            border: "none",
          }}
        />
      </div>
    </div>
  );
};
