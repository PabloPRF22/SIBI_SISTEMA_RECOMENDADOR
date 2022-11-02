import { Container,IconButton,TextField,MenuItem,Button } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import * as React from "react";
import { useState } from "react";

import texFieldService from "../Services/TextField";

import axios from "axios";


export default function GetBarraDeFiltros({setAlojamientos,setAlojFracc,setDisplayCargando,setDisplayVacio}){
  const arregloDeArreglos = [];
  const listaFiltros =texFieldService.getListaFiltrosText()
  const [open, setOpen] = React.useState(false);
  const [filtrosValues, setFiltrosValues] = useState({});
  
  const [display, setDisplay] = useState("none");

  function resetFilters(){

    setFiltrosValues({})
  }
  const handleClose = () => {
    setOpen(false);
    setDisplay("none");
  };

  const handleOpen = () => {
    setOpen(true);
    setDisplay("flex");
  };
  const handleChange = (event) => {
    switch (event.target.name) {
      case "Habitaciones":
        setFiltrosValues({
          ...filtrosValues,
          rooms: event.target.value,
        });
        break;
      case "Ascensor":
        setFiltrosValues({ ...filtrosValues, hasLift: event.target.value });
        break;
      case "Baños":
        setFiltrosValues({ ...filtrosValues, bathrooms: event.target.value});
        break;
      case "Tipo":
        setFiltrosValues({ ...filtrosValues, propertyType: event.target.value});
        break;
      case "Exterior":
        setFiltrosValues({ ...filtrosValues, exterior: event.target.value});
        break;
        case "Estado":
          setFiltrosValues({ ...filtrosValues, status: event.target.value});
          break;

    }
  };
  const filtrar = () =>{
    setDisplayCargando("flex");
    setDisplayVacio("none")
    axios
    .get("/api/alojamiento/getFiltered", {params :filtrosValues})
    .then((response) => {
      if(response.data.length==0) {
        setDisplayVacio("flex")
        setAlojamientos([]);
        setAlojFracc([]);



      }else{
        setDisplayCargando("none");


        const LONGITUD_PEDAZOS = 10; // Partir en arreglo de 3
        for (let i = 0; i < response.data.length; i += LONGITUD_PEDAZOS) {
          let pedazo = response.data.slice(i, i + LONGITUD_PEDAZOS);
          arregloDeArreglos.push(pedazo);
        }
        setAlojamientos(arregloDeArreglos);
        setAlojFracc(arregloDeArreglos[0]);
      }


    })
    .catch((error) => {});
  }

  return(
    <Container
    ariaLabel="Filtros"
    sx={{
      display: "flex",
      flexDirection: "row",
      my: "10px",
      minHeight: "50px",
      minWidth: "100%",
    }}
  >
    <IconButton
      variant="contained"
      onClick={() => {
        if (open) {
          handleClose();
        } else {
          handleOpen();
        }
      }}
    >
      <FilterListIcon />
    </IconButton>

    {listaFiltros.map((filtroText) => (
      <Container
        sx={{
          display: { display },
          height: "50px",
          bgColor: "black",
          flexDirection: "row",
        }}
      >
        <TextField
          select
          name={filtroText}
          label={filtroText}
          fullWidth
          value={typeof filtrosValues[texFieldService.getFiltroEN(filtroText)] != "undefined" ? filtrosValues[texFieldService.getFiltroEN(filtroText)]: undefined }

          onChange={handleChange}
        >
          {texFieldService.getFiltrosValue(filtroText).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </Container>
    ))}
    <Container sx = {{ display: { display,flexDirection:"Column" }}} >
    <Button variant="contained" onClick={filtrar} sx = {{ display: { display},mb:"10px"}}>Filtrar</Button>
              <Button variant="contained" onClick={resetFilters}sx = {{ display: { display }}}>Resetear los filtros</Button>          </Container>
             

  </Container>
  )
}