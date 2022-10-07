import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Snackbar } from "@mui/material";
import background from "../Assets/background.jpg";
import { style } from "@mui/system";
import { useState } from "react";
import AlertMassage from "../Components/AlertMassage";
import axios from "axios";
import Footer from "../Layouts/Footer";

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

const rangEdades = [
  {
    value: "jov",
    label: "Entre 18 y 25 años",
  },
  {
    value: "adJov",
    label: "Entre 25 y 40 años",
  },
  {
    value: "adult",
    label: "Entre 41 y 55 años",
  },
  {
    value: "adultMay",
    label: "Entre 56 y  65 años",
  },
  {
    value: "Anci",
    label: "Mayor a 66 años",
  },
];


const theme = createTheme();

export default function SignUp() {
  const error = 1;
  const [alertInfo, setAlertInfo] = useState({
    severity: "success",
    message: "",
    open: false,
  });
  const [infoStatus, setInfoStatus] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    password1: false,
    password2: false,
    rangoEdad: false,
  });

  const [data, setData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    rangoEdades: "",
    password1: "",
    password2: "",
  });

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("/api/usuario/register", data)
      .then(function (response) {
        var validate = response.data
        setAlertInfo({ severity: "success", open: true, message: validate.message });
        setInfoStatus(validate);


      })
      .catch(function (error) {
        var validate = error.response.data
        setAlertInfo({ severity: "error", open: true, message: validate.message });
        setInfoStatus(validate);
      });


  };
  const [rango, setRango] = React.useState("");

  const handleRango = (event) => {
    setRango(event.target.value);
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    error={infoStatus.nombre}
                    autoFocus
                    onChange={updateData}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="apellidos"
                    label="Apellidos"
                    name="apellidos"
                    error={infoStatus.apellidos}
                    autoComplete="family-nameç"
                    onChange={updateData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    error={infoStatus.email}
                    autoComplete="email"
                    onChange={updateData}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    label="Seleccione su rango de edad"
                    select
                    fullWidth
                    error={infoStatus.rangoEdad}
                    onChange={updateData}
                    name="rangoEdades"
                    id="rangoEdades"
                  >
                    {rangEdades.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password1"
                    id="password1"
                    autoComplete="new-password"
                    error={infoStatus.password1}
                    onChange={updateData}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize= {16}color = "red">{infoStatus.password2 && !infoStatus.password1 ? "Ambas contraseñas deben ser iguales" : ""}</Typography>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Password"
                    type="password2"
                    id="passwor2d"
                    autoComplete="new-password"
                    error={infoStatus.password2}
                    onChange={updateData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Acepto los terminos y condiciones"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ textAlign: "center" }}>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
