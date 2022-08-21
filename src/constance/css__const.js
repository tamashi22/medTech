import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ListItemButton } from "@mui/material";
import { TableRow } from "@mui/material";
import { useState } from "react";
export const CssTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "40px",
    width: "600px",
    height: "60px",
    fontSize: "18px",
    lineHeight: "21px",
    letterSpacing: "-0.04em",
    color: "#141414",

    // backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#ffffff',
    // '&.Mui-focused':{
    //   backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff',
    // },
    "& fieldset": {
      border: "2px solid  #A096A7;",
    },
    // '&:hover fieldset': {
    //   borderColor: '#DBD2FC',
    // },
    "&.Mui-focused fieldset": {
      border: "1px solid #A096A7",
    },
  },
  "& label.Mui-focused": {
    color: "#000000",
  },
}));
export const CodeText = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    border: "none",
    width: "550px",
    padding: "none",
    height: "50px",
    fontSize: "36px",
    letterSpacing: "1.8em",
    padding: "4px",

    // backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#ffffff',
    // '&.Mui-focused':{
    //     backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff',
    // },
    "& fieldset": {
      border: "none",
    },
    // '&:hover fieldset': {
    //   borderColor: '#DBD2FC',
    // },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& label.Mui-focused": {
    color: "#000000",
  },
}));

export const Find = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "40px",
    width: "200px",
    height: "38px",
    fontSize: "18px",
    lineHeight: "21px",
    letterSpacing: "-0.04em",
    color: "#141414",

    // backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#ffffff',
    // '&.Mui-focused':{
    //   backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff',
    // },
    "& fieldset": {
      border: "1px solid  #92AFDC;",
    },
    // '&:hover fieldset': {
    //   borderColor: '#DBD2FC',
    // },
    "&.Mui-focused fieldset": {
      border: "1px solid #A096A7",
    },
  },
  "& label.Mui-focused": {
    color: "#000000",
  },
}));

export const ColorButton = styled(Button)(({ theme }) => ({
  borderRadius: "40px",
  width: "600px",
  height: "60px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "24px",

  backgroundColor: " #92AFDC",
  "&:hover": {
    backgroundColor: " #92ADDD",
  },
}));

export const logButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.getContrastText("#6E15EB"),

  width: "158px",
  height: "65px",

  // '&:hover': {

  // },
}));
export const modButton = styled(Button)(({ theme }) => ({
  fontSize: "18px",
  background: " #EEF0F4",
  width: "50px",
  height: "40px",

  "&:hover": {
    backgroundColor: " #EEF0F9",
  },
}));
export const AddnewUser = styled(Button)(({ theme }) => ({
  backgroundColor: 0,
  width: "50px",
  height: "60px",
  borderRadius: "50%",
  cursor: "pointer",
  // '&:hover': {
  //   backgroundColor: " #5C486A",
  // },
}));
export const NotificationB = styled(Button)(({ theme }) => ({
  background: "#ffffffff",
  width: "50px",
  height: "60px",
  borderRadius: "100%",
  cursor: "pointer",
  // '&:hover': {
  //   backgroundColor: " #5C486A",
  // },
}));

export const cssRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "& .MuiTableRow-root": {
    background: "#ffffffff",
  },
}));
export const SearchInput=styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    border: "none",
    
    height: "38px",
    fontSize: "18px",
    borderRadius:"28px",
    padding: "4px",

     backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#ffffff',
    '&.Mui-focused':{
        backgroundColor: theme.palette.mode === 'light' ? '#EEF0F4' : '#ffffff',
    },
    "& fieldset": {
      border: "none",
    },
    '&:hover fieldset': {
      borderColor: '',
    },
    "&.Mui-focused fieldset": {
      border: "1px solid  #92ADDD",
    },
  },
  
}));

export const mod_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 555,
  bgcolor: "#ffff",
  boxShadow: 24,
  borderRadius: "12px",
  
  display: "flex",
  
  flexDirection: "column",
  
};
export const  nested_mod_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 200,
  bgcolor: "#ffff",
  boxShadow: 24,
  borderRadius: "12px",
  p: 10,
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};
export const AddNewItemButton = styled(Button)(({ theme }) => ({
  
  width: "500px",
  height: "60px",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "24px",
  display:"flex",
  justifyContent:'space-between', 
  color:"#000000",
  marginBottom:"30px",
  marginTop:'30px',
  background:"#EEF0F4",
  "&:hover": {
    backgroundColor: " #92ADDD",
  },
}));
export const SelectAnaliz = styled(Button)(({ theme }) => ({
  
  width: "500px",
  height: "60px",
  textTransform: "none",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "24px",
  display:"flex",
  justifyContent:'center', 
  color:"#000000",
  marginBottom:"20px",
  marginTop:'20px',
 
  "&:active": {
    backgroundColor: " #92ADDD",
  },
}));


export const usePagination = (list, perPage) => {
  const [cur, setCur] = useState(0);
  const pages = Math.ceil(list.length / perPage);
  const data = list.slice(cur * perPage, cur * perPage + perPage);
  const handleChangePage = (event, value) => {
    setCur(value - 1);
  };
  console.log(cur);
  return {
    pages,
    data,
    handleChangePage,
    currentPage: cur,
  };
};