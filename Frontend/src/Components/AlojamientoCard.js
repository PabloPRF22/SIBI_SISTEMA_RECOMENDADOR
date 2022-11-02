import { Typography, Box, Container, Divider, Icon,Card,CardContent,IconButton, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ShowerIcon from '@mui/icons-material/Shower';
import WeekendIcon from '@mui/icons-material/Weekend';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AlojamientoCard({ alojamiento }) {
  const [buttonInfo, setButtonInfo] = useState({button1: "default",button2: "default"})
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const suggestedTexts = alojamiento.suggestedTexts.split("title");

  function getNumberLikes(){
    if(alojamiento.likes){
      return(
        <Container disableGutters sx = {{display:"flex"}}>
          <Typography>{alojamiento.likes}</Typography>
          <FavoriteIcon sx = {{color:"red"}}/>
        </Container>

      )
    }
  }
  function getDescripcionCorta(longitud) {
    if (alojamiento.description.length > longitud)
      return alojamiento.description.slice(0, longitud) + "...";
    else return alojamiento.description;
  }


  function likeApartamento(){
    axios.post("api/usuario/likeApartamento", {propertyCode: alojamiento.propertyCode,status:buttonInfo.button1 },{ headers: headers })
    .then((response) => {
      setButtonInfo({button1:"success", button2:"default"})
    })
    .catch((error) => {

    });
  }
  function dislikeApartamento(){
    axios.post("api/usuario/dislikeApartamento", {propertyCode: alojamiento.propertyCode,status:buttonInfo.button2 },{ headers: headers })

    .then((response) => {
      setButtonInfo({button1:"default", button2:"error"})

    })
    .catch((error) => {

    });
  }

  useEffect(()=>{
    axios.get("/api/usuario/isvalued", {params:{propertyCode:alojamiento.propertyCode },headers: headers })
    .then((result=>{
      switch(result.data.status){
        case "LIKE":
          setButtonInfo({...buttonInfo, button1:"success"})
          break;
        case "DISLIKE": 
          setButtonInfo({...buttonInfo, button2:"error"})
          break;
        default:
          setButtonInfo({button1:"default", button2:"default"})

          break;

      }
    
    }))
    

  },[alojamiento])

  return (
    /*
      <Box sx={{ height: "90%", width: "40%", mx: "20px" }}>
            <img
              src={imagen}
              height="100%"
              width="100%"
              style={{ borderRadius: "20px" }}
            ></img> 
          </Box>
      */
    //https://codesandbox.io/s/material-demo-forked-04nd0p?file=/SectionCarousel.js:893-899
    <Card
      sx={{
        height: "310px",
        width: "100%",
        bgcolor: "#fffff",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Box sx={{ height: "90%", width: "30%", mx: "20px" }}>
          <img
            src={alojamiento.thumbnail}
            height="100%"
            width="100%"
            style={{ borderRadius: "20px" }}
          ></img>
        </Box>
        <Box
          sx={{
            marginLeft: "5px",
            height: "100%",
            width: "60%",
            bgcolor: "white",
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
          }}
        >
          <Container
          disableGutters 
            sx={{
              minWidth: "100%",
              display: "flex",
              flexDirection: "row",

            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", mr: "auto" }}
            >
              {suggestedTexts[suggestedTexts.length - 1]
                .replace(":", "")
                .replace("}", "")
                .replace("'", "")
                .replace("'", "")
                .replace("'", "")}
            </Typography>
            <IconButton fontSize="large" color = {buttonInfo.button1}  onClick={likeApartamento}>
              <ThumbUpIcon/>
            </IconButton>
            <IconButton fontSize="large" color = {buttonInfo.button2} onClick={dislikeApartamento}>
              <ThumbDownIcon/>
            </IconButton>

          </Container>
          {getNumberLikes()}

          <Divider sx={{ width: "100px", marginBottom: "10px" }} />

          <Typography
            sx={{ fontSize: "36px", wordWrap: "break-word" }}
          ></Typography>

          <Typography sx={{ fontSize: "16px", wordWrap: "break-word" }}>
            {getDescripcionCorta(800)}
          </Typography>

          <Typography sx={{ fontSize: "16px", wordWrap: "break-word" }}>
            <strong>Precio:</strong> {alojamiento.price}€
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "16px", wordWrap: "break-word" }}>
              <strong>Habitaciones</strong> {alojamiento.rooms}
            </Typography>
            <WeekendIcon></WeekendIcon>
            <Typography sx={{ fontSize: "16px", marginLeft: "auto" }}>
              <strong>WC</strong> {alojamiento.bathrooms}
            </Typography>
            <ShowerIcon sx={{ marginRight: "auto" }}></ShowerIcon>
          </Box>

          <Typography
            sx={{ color: " #969393", fontSize: "15px", marginTop: "auto" }}
          >
            {/*alojamiento.huespedes*/} Viajeros {/*alojamiento.dormitorios*/}{" "}
            dormitorios {/*alojamiento.camas*/} camas {/*alojamiento.banios*/}{" "}
            baños
          </Typography>
        </Box>
      </CardContent>
      <CardContent
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", md: "none", alignItems: "center" },
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "80%",
            width: "100%",
            bgcolor: "blue",
            marginLeft: "5px",
          }}
        >
          <img height="100%" width="100%"></img>
        </Box>
        <Box
          sx={{
            height: "20%",
            width: "100%",
            bgcolor: "white",
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ color: " #969393", fontSize: "15px" }}>
            {/*alojamiento.tipo*/} en {/*alojamiento.ciudad*/}
          </Typography>
          <Typography sx={{ fontSize: "17px", wordWrap: "break-word" }}>
            {/*getDescripcionCorta(10)*/}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
