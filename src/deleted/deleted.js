{
  /* <TableContainer > 
<Table  aria-label="simple table">
    <TableHead>
        <TableRow sx={{}}>
            <TableCell>Базовая информация</TableCell>
            <TableCell align="center">Номер телефона</TableCell>
            <TableCell align="center">Срок</TableCell>
            <TableCell align="center">Дата последнего посещения</TableCell>
            <TableCell align="center">Врач</TableCell>
            <TableCell align="center"></TableCell>
        </TableRow>
    </TableHead>
    <TableBody >
        {data.map((item)=>(
        <TableRow sx={{marginBottom:"10px",background:"#ffffff"}} key={item.id} >
            <TableCell  key={item.id}> 
                <div style={{display:"flex"}}>
                    <img src={item.imageUrl} className="base_img"></img>
                    <div style={{flexDirection:"column",alignItems:"center"}}>
                        <p style={{margin:"0"}} className="user__names">{item.user.lastName +" "+item.user.firstName+" "+item.user.middleName}</p>
                        <p style={{margin:"0",}}className="user__email">{item.user.email}</p>   
                    </div>
                </div>
            </TableCell>
            <TableCell align="center">{item.user.phoneNumber}</TableCell>
            <TableCell align="center">{today.diff(item.startOfPregnancy, 'week')+1}</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">
            <div style={{flexDirection:"column",alignItems:"center"}}>
                        <p style={{margin:"0"}} >{item.doctor.user.lastName+" "+item.doctor.user.firstName}</p>
                        <p style={{margin:"0",}}>{item.doctor.user.middleName}</p>   
                    </div>
            </TableCell>
            <TableCell>...</TableCell>
        </TableRow>
        ))}
    </TableBody>
</Table>
</TableContainer>
<div style={{display:"flex",justifyContent:"center"}}>
<Pagination
count={pages}
variant="outlined"
onChange={handleChangePage}/>
<Box sx={{ maxWidth: 60,maxHeight:"20px"  }}>
    <FormControl fullWidth>
            
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={perPage}
            label="Age"
            onChange={handlePerPage}
        >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>    
            <MenuItem value={10}>10</MenuItem>
        </Select>   
    </FormControl>
</Box> */
}

// import { API } from "../../utils/axiosConfig";

// const API_URL = process.env.REACT_APP_API;
// class TableServis{
//     //for admin and doctors
//     async getPatients(){
//         const response = await API
//         .get("v1/patients")
//         return response.data;
//     }
//     async getPatientsVisit(id){
//         const response =await API
//         .get(API_URL+`v1/patient_visits/last-patient-visit/${id}`)
//         return response.data;
//     }
//     //only for admin
//     async getDoctors(params){
//         const responce = await API
//         .get(API_URL+"v1/doctors",{params})
//         return responce.data;
//     }
// }
// export default new TableServis

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
