import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
export const CssTextField = styled(TextField)(({ theme }) => ({

    '& .MuiOutlinedInput-root': {
      borderRadius: "20px",
      backgroundColor: theme.palette.mode === 'light' ? '#DBD2FC' : '#DBD2FC',
      
      '& fieldset': {
        borderColor:"#DBD2FC",
      },
      '&:hover fieldset': {
        borderColor: '#DBD2FC',
      },
      '&.Mui-focused fieldset': {
  
        border: "1px solid #6E15EB",
       
      },
     
    },
    '& label.Mui-focused': {
      color: '#6E15EB',
    },
  }));
  export const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#6E15EB"),
    backgroundColor: "#6E15EB",
    '&:hover': {
      backgroundColor: "#8E15EE",
    },
  }));
  export const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Введенный email недействителен')
      .required('Это поле обязательное'),
    password: yup
      .string('Enter your password')
      .min(8, 'Пароль должен быть не меньше 8 символов')
      .required('Это поле обязательное'),
  });