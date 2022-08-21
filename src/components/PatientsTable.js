import React, { useEffect, useState } from "react";
import { AddnewUser } from "../constance/css__const";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../redux/slices/base";
import { SubHead } from "./SubHead";
import { usePagination } from "../hooks/usePagination";
import {
  DataGrid,
  ruRU,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Pagination } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import profileLink from "../images/Vector.svg";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import add from "../images/add.png";
import { getPatientsVisit } from "../redux/slices/base";
import def from "../images/defaultPatient.jpg"
import exportFromJSON from 'export-from-json'
moment.locale("ru");
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

export const PatientTable = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const [userId ,setUserID]=useState()
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 8,
  });
  const patient = useSelector((state) => state.table.patients);
  const patientVisit = useSelector((state) => state.table.visit);
  console.log(patient);
  const dispach = useDispatch();
  // const rows = [];
  // const [perPage, setPerPage] = useState(1)
  // const [rowData, setRowData] = useState(rows);
  // const [orderDirection, setOrderDirection] = useState("asc");
  // const {
  //     pages,
  //     handleChangePage,
  //     data
  // } = usePagination((patient ? patient.patients : []), perPage);
  // console.log(data)
  
  useEffect(() => {
    dispach(getPatients());
  }, []);
  const patients = patient ? patient.patients : [];
  console.log(patients);

  var today = new Date();
  var today = moment();
  //today.diff(item.startOfPregnancy, 'week')+1
  //colums for table>
  const columns = [
    {
      field: "Аватар",
      headerName: "",
      flex: 1,
      maxWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        let sourse = params.row.imageUrl;
        return (
          <div className="rowitem">
            {<img className="base_img" src={sourse==null?def:sourse}></img>}
          </div>
        );
      },
    },
    {
      field: "user",
      width: 250,
      headerName: "Базовая иноформация",
      flex: 2,
      valueGetter: (params) => params.row.user.lastName,
      valueGetter: (params) => params.row.user.email,
      valueGetter: (params) => params.row.user.firstName,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="rowitem"
              style={{ color: "#141517", fontSize: "18px" }}
            >
              {params.row.user.lastName +
                " " +
                params.row.user.firstName +
                " " +
                params.row.user.middleName +
                ""}
            </div>
            <div>{params.row.user.email}</div>
          </div>
        );
      },
    },
    
    {
      field: "email",
      flex: 1,
      headerName: "Email",
      valueGetter: (params) => params.row.user.email,
      hide: true,
    },
    {
      field: "phoneNumber",
      headerName: "Номер телефона",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row.user.phoneNumber,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.user.phoneNumber}</div>;
      },
    },
    {
      field: "startOfPregnancy",
      headerName: "Срок",
      flex: 1,  
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="rowitem">{today.diff(params.value, "week") + 1} неделя</div>
        );
      },
    },
    // {
    //   field: "date",
    //   headerName: "Дата последнего посещения",
    //   flex: 2,
    //   align: "center",
    //   headerAlign: "center",
    //   valueGetter:(patientVisit)=>patientVisit.dateVisit,
    //   renderCell: (params) => {
    //     useEffect(() => {
    //       setUserID(params.row.user.id)
    //       dispach(getPatientsVisit({ id: userId }));
    //     }, []);
        
    //     const visitDate = patientVisit ? patientVisit.dateVisit : "нет записей";
    //     const visitTime = patientVisit ? patientVisit.visitStartTime : "нет записей";
    //     var formatted = moment(visitTime, "HH:mm:ss").format("HH:mm");
    //     return (
    //       <div className="rowitem">
    //         {moment(visitDate).format("MMMM d, YYYY") + "-" + formatted}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "doctor",
      headerName: "Врач",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row.doctor.user.firstName,
      valueGetter: (params) => params.row.doctor.user.lastName,
      valueGetter: (params) => params.row.doctor.user.middleName,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.doctor.user.lastName +
              " " +
              params.row.doctor.user.firstName}
            <div style={{ textAlign: "center" }}>
              {params.row.doctor.user.middleName} 
            </div>
          </div>
        );
      },
    },
    {
      field: "Действия",
      headerName: "",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row.user.id,

      renderCell: (params) => {
        return (
          <div className="rowitem">
            <Link to={`/patientProfile/${params.row.user.id}`}>
              <img src={profileLink}></img>
            </Link>
          </div>
        );
      },
    },
  ];
  const classes = useStyles();
  return (
    <div>
      <SubHead>
        <div className="countStyle">
          <p className="count">{patient ? patient.totalItems : null}</p>
          <p>пациентов</p>
        </div>
        <AddnewUser
          sx={{
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <img src={add}></img>
        </AddnewUser>
      </SubHead>
      <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          autoHeight
          className={classes.root}
          rows={patients}
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
