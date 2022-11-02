import {
    AppBar,
    Box,
    Button,
    Container,
    Icon,
    IconButton,
    Toolbar,
    Typography,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import { useEffect } from "react";
  import { useState } from "react";
  import Avatar from "@mui/material/Avatar";
  import Menu from "@mui/material/Menu";
  import MenuItem from "@mui/material/MenuItem";
  import LogoutIcon from "@mui/icons-material/Logout";
  import axios from "axios";
  import logo from "../Assets/logo.jpg"
  import { Link, useNavigate } from "react-router-dom";
  export default function Navegador() {
    const [menu, setMenu] = useState(false);
    const [anchorEl, setaAchorEl] = useState(null);
    const [pages, setPages] = useState([]);
    const [isLogged, setLogged] = useState(false);
    const [button, setButton] = useState({active: false, contenido: ""});
  
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    function addRole(){
      axios
      .put("/api/usuario/role", {},{
        headers: headers})
      .then(
        (response) => {
          setPages(["inicio","busqueda","mis reservas","mis alojamientos","contacto"]);
          setButton({active:false, contenido:""})
  
          
  
        },
        (error) => {
  
        }
      );
    }
    function handleOpenMenu(event) {
      setMenu(!menu);
      setaAchorEl(event.currentTarget);
    }
  
    useEffect(() => {
      axios
        .get("/api/usuario/getRoles", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (response) => {
            setLogged(true);
            if(response.data.roles.includes("Alojador") && response.data.roles.includes("Cliente")){
              setPages(["inicio","busqueda","mis reservas","registrar alojamiento","mis alojamientos","contacto", "mis clientes"]);
  
            }else{
              if(response.data.roles.includes("Alojador")){
                setButton({active:true, contenido:"Quiero ser huesped"})
                setPages(["inicio", "registrar alojamiento","mis alojamientos","mis clientes", "contacto"]);
              }
              if(response.data.roles.includes("Cliente")){
                setButton({active:true, contenido:"Quiero ser alojador"})
                setPages(["inicio","busqueda","mis reservas","contacto"]);
              }
            }
  
          },
          (error) => {
            setLogged(false);
            setPages(["inicio", "busqueda", "login", "registro", "contacto"]);
          }
        );
    }, [isLogged]);
    let navigate = useNavigate();
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <img height="60px" width="70px" src={logo}></img>
            </Box>
            <Box display={{ xs: "flex", md: "none" }}>
              <IconButton
                size="large"
                aria-haspopup="true"
                color="inherit"
                onClick={(e) => handleOpenMenu(e)}
              >
                <MenuIcon sx={{ height: "35px", width: "40px" }} />
              </IconButton>
              <Menu
                id="account-menu"
                open={menu}
                onClose={handleOpenMenu}
                onClick={handleOpenMenu}
                anchorEl={anchorEl}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      mt: -1,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 30,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {pages.map((page, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      onClick={(e) => {
                        if (page == "registrar alojamiento")
                          navigate("/nuevoAlojamiento");
                        if (page == "inicio") navigate("/");
                        if (page == "login") navigate("/login");
                        if (page == "mis alojamientos")
                          navigate("/misAlojamientos");
                        if (page == "registro") navigate("/register");
                        if (page == "busqueda") navigate("/busqueda");
                        if (page == "mis reservas") navigate("/reservas");
                        if (page == "contacto") navigate("/contacto");
                        if (page == "mis clientes") navigate("/clientes");
  
                      }}
                    >
                      <Typography
                        sx={{
                          mx: "auto",
                          fontSize: "16px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mx: "auto" }}>
              <img height="60px" width="60px" src={logo}></img>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={(e) => {
                      if (page == "registrar alojamiento")
                        navigate("/nuevoAlojamiento");
                      if (page == "inicio") navigate("/");
                      if (page == "login") navigate("/login");
                      if (page == "mis alojamientos")
                        navigate("/misAlojamientos");
                      if (page == "registro") navigate("/register");
                      if (page == "busqueda") navigate("/busqueda");
                      if (page == "mis reservas") navigate("/reservas");
                      if(page == "contacto") navigate("/contacto");
                      if (page == "mis clientes") navigate("/clientes");
  
                    }}
                    sx={{
                      ml: 4,
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>
            <Button variant = "contained" sx ={{display: button.active ==true ? "flex":"none"}} onClick={(e)=>addRole()}>
               {button.contenido} 
            </Button>
            <IconButton
              size="large"
              aria-haspopup="true"
              color="inherit"
              onClick={(e) => {
                if (isLogged) navigate("/perfil");
                else navigate("/login");
              }}
            >
              <Avatar sx={{ height: "50px", width: "50px" }}></Avatar>
            </IconButton>
            <IconButton
              sx={{ display: isLogged ? "flex" : "none" }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogoutIcon sx={{ color: "red" }}></LogoutIcon>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }