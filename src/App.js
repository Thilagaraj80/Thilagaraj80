import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Select,
  MenuItem,
  Typography,
  RadioGroup,
  FormLabel,
  Radio,
  FormControl,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  root: {
    padding: "19px 8px",
    borderRadius: "12px",
    border: "1px solid #C22131",
    marginBottom: "20px",
    marginTop: "30px",
    marginLeft: "20px",
  },
  textField: {
    marginTop: "12px",
    display: "block",
  },
  label: {
    color: "gray",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#C22131"  
    
  },
  img: {
    height: "150px",
    width: "100%",
    objectFit: "cover",
  },
  addcolor: {
    color: "#C22131",
  },
}));
const InitialState = {
  name: "",
  mail: "",
  phone: "",
  gender: "",
  proof: "",
  hobbies: "",
  file: "",
  error: {
    name: "",
    mail: "",
    phone: "",
    gender: "",
    proof: "",
  },
};
let ValidateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};
export default function App() {
  const classes = styles();
  const [data, setData] = React.useState({ ...InitialState });
  const [list, setList] = React.useState([]);
  const updateState = (key, value) => {
    let error = data.error;
    error[key] = "";
    setData({ ...data, [key]: value, error });
  };
  const validate = () => {
    let isValid = true;
    let error = data.error;
    //Checking Name
    if (data.name.length === 0) {
      isValid = false;
      error.name = "Name is Required";
    }
    //Checking email
    if (data.mail.length === 0) {
      isValid = false;
      error.mail = "Email is Required";
    }
    if (!ValidateEmail(data?.mail)) {
      isValid = false;
      error.mail = "Invalid Email";
    }
    //Checking startDate
    if (data.phone.length === 0) {
      isValid = false;
      error.phone = "Phone is Required";
    }
    if (data.phone.length !== 10) {
      isValid = false;
      error.phone = "Phone must be 10 digit";
    }   
    setData({ ...data, error });
    return isValid;
  };
  const hobbies = [
    {
      id: "1",
      label: "Playing Cricket",
      value: "Playing Cricket",
    },
    {
      id: "2",
      label: "Reading Books",
      value: "Reading Books",
    },
    {
      id: "3",
      label: "Watching Tv",
      value: "Watching Tv",
    },
    {
      id: "4",
      label: "Working With React",
      value: "Working With React",
    },
  ];
  const submit = () => {
    if (validate()) {
      //execute result
      setList([...list, data]);
    } else {
      return false;
    }
  };
  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        <b> Basic Registration</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div className={classes.root}>
            <Box height="10px" />
            {/*  */}
            <TextField
              className={classes.textField}
              size="small"
              label="Name"
              onChange={(e) => updateState("name", e.target.value)}
              fullWidth
              placeholder="Enter Your Name"
              variant="outlined"
              helperText={data?.error?.name?.length > 0 && data?.error?.name}
              error={data?.error?.name?.length > 0 && data?.error?.name}
            />
            <Box height="10px" />
            <TextField
              className={classes.textField}
              size="small"
              label="Email"
              fullWidth
              onChange={(e) => updateState("mail", e.target.value)}
              placeholder="Enter Your Email"
              variant="outlined"
              helperText={data?.error?.mail?.length > 0 && data?.error?.mail}
              error={data?.error?.mail?.length > 0 && data?.error?.mail}
            />
            <Box height="10px" />
            <TextField
              className={classes.textField}
              size="small"
              label="Phone"
              fullWidth
              type="number"
              placeholder="Enter Your Phone Number"
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === "e") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => updateState("phone", e.target.value)}
              helperText={data?.error?.phone?.length > 0 && data?.error?.phone}
              error={data?.error?.phone?.length > 0 && data?.error?.phone}
            />
            <Box height="10px" />
            <FormControl className={classes.addcolor}>
              <FormLabel>Gender :</FormLabel>
              <RadioGroup
                onChange={(e) => updateState("gender", e.target.value)}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
            </FormControl>
            <Box height="10px" />
            <FormLabel>Hobbies :</FormLabel>
            <FormGroup className={classes.addcolor}>
              {hobbies.map((val) => {
                return (
                  <FormControlLabel
                    onChange={() => updateState("hobbies", val?.value)}
                    control={
                      <Checkbox
                        checked={val?.value === data?.hobbies ? true : false}
                      />
                    }
                    label={val?.label}
                  />
                );
              })}
            </FormGroup>
            <Box height="10px" />
            <FormControl fullWidth>
              <FormLabel>Select Id Proof</FormLabel>
              <Box height="10px" />
              <Select
                value={data?.proof}
                onChange={(e) => updateState("proof", e.target.value)}
                placeholder="Select Id Proof"
                label={false}
                size="small"
              >
                <MenuItem value={"Pan Card"}>Pan Card</MenuItem>
                <MenuItem value={"Adhaar card"}>Aadhar Card</MenuItem>
                <MenuItem value={"Driving License"}>Driving License</MenuItem>
                <MenuItem value={"Ration Card"}>Ration Card</MenuItem>
              </Select>
            </FormControl>
            <Box height="12px" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                updateState("file", URL.createObjectURL(e.target?.files?.[0]))
              }
            />
            <Box height="10px" />
            {data?.file && (
              <img className={classes.img} src={data?.file} alt="" />
            )}
            <Box height="10px" />
            <center>
              <Button onClick={submit} variant="contained">
                Submit
              </Button>
            </center>
          </div>
        </Grid>
        <Grid item xs={7}>
          {list?.length > 0 && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table" 
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Hobbies</TableCell>
                    <TableCell align="right">ID Proof</TableCell>
                    <TableCell align="right">Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.mail}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.hobbies}</TableCell>
                      <TableCell align="right">{row.proof}</TableCell>
                      <TableCell align="right">{row.file}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
