import React, { useEffect, useState } from "react";
import admin from "../../images/admin.png";
import Header from "../../components/Header";
import phone from "../../images/phone.png";
import sos from "../../images/sos1.png";
import "./Admin.css";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Pagination } from "@mui/material";
import { usePagination } from "../../constance/css__const";
import { getWeeks } from "../../redux/slices/base";
import { useDispatch, useSelector } from "react-redux";
import def from "../../images/nophoto.png"; 
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function AdminPanel() { 
  const dispach = useDispatch();
  const weeks = useSelector((state) => state.table.weeks);
  console.log(weeks);
  const [add, setAdd] = useState(false);
  const [perPage, setPerPage] = useState(1);
  // const [rowData, setRowData] = useState(rows);
  const [orderDirection, setOrderDirection] = useState("asc");
  const { pages, handleChangePage, data } = usePagination(
    weeks ? weeks : [],
    perPage
  );
  const handleAdd= ()=>{
      setAdd(true)
  }
  console.log("pagination", data ? data[0] : null);
  const baby = data ? data[0] : null;

  useEffect(() => {
    dispach(getWeeks());
  }, []);
  return (
    <div className="wrapper7">
      <Header>
        <div className="checkHead">
          <img className="checkImg" src={admin}></img>
          <p className="checkTitle">Управление контентом</p>
        </div>
      </Header>
      <div className="adminMain">
        <div className="clinicInfo">
          <div className="headInfo">
            <p className="hedtit">Данные поликлиники</p>
          </div>
          <div className="botInfo">
            <div className="flexP">
              <img src={phone}></img>
              <p className="tel">Номер ресепшена</p>
              <TextField
              defaultValue={"+996706901851"}
              ></TextField>
              <IconButton size="large" color="primary">
                <SaveIcon />
              </IconButton>
            </div>
            <div className="flexP">
              <img src={sos}></img>
              <p className="tel">Номер экстренной скорой помощи</p>
              <TextField
              defaultValue={"+996709621762"}
              ></TextField>
              <IconButton size="large" color="primary">
                <SaveIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panelHead">
            <p className="ned">{baby?baby.weekday:""}-я неделя</p>
          </div>
          <div className="panelBody">
            {baby
              ? baby.weeksOfBabyDevelopmentDTOS.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="panelWrap">
                        <div className="panelBlockWrap">
                          <p className="blockLabel">Изображение</p>
                          <div className="panelBlock">
                            <img
                              className="Panelimg"
                              src={item.imageUrl ? item.imageUrl : def}
                            ></img>
                            <input type="file" className="filePick" />
                          </div>
                        </div>
                        <div className="panelBlockWrap">
                          <p className="blockLabel">Текст</p>
                          <div className="panelBlock2">
                            <TextField
                              label="Заголовок"
                              fullWidth
                              sx={{ marginBottom: "20px" }}
                              defaultValue={item.header ? item.header : ""}
                            ></TextField>
                            <TextField
                              label="Описание"
                              fullWidth
                              multiline
                              rows={7}
                              defaultValue={
                                item.description ? item.description : ""
                              }
                            ></TextField>
                          </div>
                        </div>
                      </div>
                      <div className="btnGroup">
                        <Button variant="outlined" startIcon={<Save />}>
                          Сохранить изменения
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete />}
                          sx={{ marginLeft: "20px" }}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  );
                })
              : null}

              {add} 
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "59px",
                onClick:  (handleAdd)
              }}
            >
              Добавить информацию
            </Button>
            <Pagination
              count={42}
              variant="outlined"
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
