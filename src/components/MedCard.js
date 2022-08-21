import React, { useState } from 'react'
import "../styles/medcard.css"
import { TextField } from '@mui/material'
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMedcard } from '../redux/slices/patients';
import { useEffect } from 'react';
function MedCard(props) {
    const dispach=useDispatch()
    console.log("props",props.patientId)
    const medical = useSelector((state)=>state.patient.medcard)
    console.log("medical",medical)
    useEffect(() => {
        props.patientId?
        dispach(getMedcard({ id:props.patientId })):
        console.log("нет ID")
      }, []);
  return (
    
    <div className='medWrapper'>
        <div className='medWrapper2'>
        <div className='medHead'>
            <p className='medTitle'>Индивидуальная карта  </p>
            <p className='medSubTitle'>Беременной и родильницы № 4</p>  
        </div>
        <form>
        <div className='medPart1'>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Группа крови"
                    defaultValue={"2"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Кровь на RW"
                    defaultValue={"Отрицательный"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Резус-принадлежность"
                    defaultValue={"Отрицательный"}
                >

                </TextField>
            </div>

            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Резус-принадлежность мужа/партнера"
                    defaultValue={"Отрицательный"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Кровь на ВИЧ"
                    defaultValue={"Отрицательный"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Кровь на ВИЧ партнера"
                    defaultValue={"Отрицательный"}
                >

                </TextField>
            </div>

            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Титр резус-антител 28 недель беременности"
                    defaultValue={"1:4"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Прибыла из другой медицинской
                    организации"
                    defaultValue={"Да"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Указать откуда"
                    defaultValue={"Национальная госпиталь Министерство Здравохранения КР"}
                >

                </TextField>
            </div>
            <TextField sx={{width:"300px"}}
                    variant='standard'
                    label="Дата взятия на учет"
                    defaultValue={"2022-08-18"}
                >

                </TextField>
                </div>
            <div className='medPart2'>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Фамилия"
                    defaultValue={"Абдиева"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Имя"
                    defaultValue={"Жибек"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Отчество"
                    defaultValue={"Абибиллаевна"}
                >

                </TextField>
            </div>
            <TextField sx={{width:"300px",marginBottom:"30px"}}
                    variant='standard'
                    label="Дата рождения"
                    defaultValue={"1995-05-17"}
                >

                </TextField>

                <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Территория страхования"
                    defaultValue={"----/----/----/----"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Номер удостоверения соцзащиты"
                    defaultValue={"0234567890"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Гражданство"
                    defaultValue={"Кыргызстан"}
                >

                </TextField>
            </div>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Категория пациента"
                    defaultValue={"Беременна"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Постоянное место жительства"
                    defaultValue={"Токтогула, 112"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Телефон"
                    defaultValue={"+996777888999"}
                >

                </TextField>
            </div>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Место работы, должность, телефон"
                    defaultValue={"Мамакеева, 98"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Условия труда"
                    defaultValue={"Соответствует всем условиям"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Работает ли теперь"
                    defaultValue={"Да"}
                >

                </TextField>
            </div>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Фамилия и место работы мужа/партнера, телефон"
                    defaultValue={"Кадыров"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Семейное положение"
                    defaultValue={"Замужем"}

                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Образование"
                    defaultValue={"Высшее"}
                >

                </TextField>
            </div>
            <div className='medFlex1'>
                <TextField sx={{width:"400px"}}
                    label="Беременность/Роды"
                    defaultValue={"Тяжелые"}
                >
                </TextField>
                <TextField sx={{width:"400px"}}
                    label="Срок беременности по последним месячным"
                    defaultValue={"28"}

                >
                </TextField>

            </div>
            <div className="btnGroup">
                        <Button variant="outlined" startIcon={<Save />}>
                          Сохранить изменения
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          
                          sx={{ marginLeft: "20px" }}
                        >
                          Отменить
                        </Button>
                      </div>
                    
            </div>
            


        
        </form>
        </div>
    </div>
  )
}

export default MedCard