import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import background from "../Assets/background.jpg";
import { style } from "@mui/system";
import { useState } from "react";
import AlertMassage from "../Components/AlertMassage";
import axios from "axios";
import Footer from "../Layouts/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

let styles = {
  backgroundContainer: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    top: 0,
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  mainContainer: {
    backgroundColor: "white",
    borderRadius: "30px",
    margin: "auto",
    boxShadow: "1px 2px 9px #F4AAB9",
  },
};

const theme = createTheme();

export default function SignIn() {
  const [alertInfo, setAlertInfo] = useState({
    severity: "success",
    message: "",
    open: false,
  });
  
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const [errorAlert, setErrorAlert] = useState({display:"none", message:""});

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  function cerrarAlerta(){
    setErrorAlert({...errorAlert,display:"none"})
  }
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    axios
      .post("/api/usuario/login", data)
      .then(function (response) {
        setAlertInfo({
          severity: "success",
          open: true,
          message: response.data.message,
        });
        setErrorAlert({...errorAlert,display: "none"})
        window.localStorage.setItem("token", response.data.token);
        navigate("/")
      })
      .catch(function (error) {
        setErrorAlert({display: "flex",message: error.response.data.message})
      });
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters sx={styles.backgroundContainer}>
        <Container maxWidth="xs" sx={styles.mainContainer}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AlertMassage
                    alertInfo={alertInfo}
                    setAlertInfo={setAlertInfo}
                    message=""
                  ></AlertMassage>
                </Grid>

                <Container
                  sx={{
                    display: errorAlert,
                    alignContent: "center",
                    textAlign: "left",
                    bgcolor:"#D0342C",
                    marginLeft:"18px",
                    borderRadius:"10px"

                  }}
                >
                  <Typography color = "white" fontSize={17}>{errorAlert.message}</Typography>
                  <IconButton aria-label="delete" size="small"  sx ={{marginLeft:"auto"}} onClick= {cerrarAlerta}>
                    <CloseIcon fontSize="inherit" sx ={{color:"white"}}/>
                  </IconButton>
                </Container>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    error={error}
                    autoComplete="email"
                    onChange={updateData}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={error}
                    onChange={updateData}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ textAlign: "center" }}>
                  <Link href="/register" variant="body2">
                    Si todavia no tienes cuenta, !REGISTRATE¡
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Footer></Footer>
      </Container>
    </ThemeProvider>
  );
}
