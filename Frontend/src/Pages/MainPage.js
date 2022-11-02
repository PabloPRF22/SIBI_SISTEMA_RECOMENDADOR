import * as React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import {Container} from "@mui/material";


import Footer from "../Layouts/Footer";
import Navegador from "../Layouts/NavBar";


import Paginas from "../Components/Paginas"
import Cargando from "../Components/Cargando";
import Filtros from "../Components/Filtros";
import ListaAlojamientos from "../Components/ListaAlojamientos";

export default function CustomizedTables() {

  const [page, setPage] = useState(0);
  const [numAloj, setNumAloj] = useState(0);

  const [alojamientos, setAlojamientos] = useState([]);
  const [alojFracc, setAlojFracc] = useState([]);
  const [displayCargando, setDisplayCargando] = useState("flex");
  const [displayVacio, setDisplayVacio] = useState("none");

  const arregloDeArreglos = [];



  useEffect(() => {
    axios
      .get("/api/alojamiento/getall", {})
      .then((response) => {
        setNumAloj(response.data.length);
        setDisplayCargando("none");
        const LONGITUD_PEDAZOS = 10; // Partir en arreglo de 3
        for (let i = 0; i < response.data.length; i += LONGITUD_PEDAZOS) {
          let pedazo = response.data.slice(i, i + LONGITUD_PEDAZOS);
          arregloDeArreglos.push(pedazo);
        }
        setAlojamientos(arregloDeArreglos);
        setAlojFracc(arregloDeArreglos[0]);
      })
      .catch((error) => {});
  }, []);



  function previusPage() {
    if (page !== 0) {
      const previusPage = page - 1;
      setPage(previusPage);
      setAlojFracc(alojamientos[previusPage]);
    }
  }

  function nextPage() {
    if (page < numAloj) {
      const nextPage = page + 1;
      setPage(nextPage);
      setAlojFracc(alojamientos[nextPage]);
    }
  }






  return (
    <>
      
      <Navegador></Navegador>
      <Container
        disableGutters
        display={displayCargando == "none" ? "flex" : "none"}
        sx={{ minWidth: "100%" }}
      >
        <Filtros setAlojFracc={setAlojFracc} setAlojamientos = {setAlojamientos} setDisplayCargando = {setDisplayCargando} setDisplayVacio = {setDisplayVacio}></Filtros>
        <Paginas page={page} nextPage = {nextPage} previusPage={previusPage}></Paginas>
        <Cargando displayCargando={displayCargando} displayVacio={displayVacio}></Cargando>
        <ListaAlojamientos alojFracc={alojFracc}></ListaAlojamientos>
        <Paginas page={page} nextPage = {nextPage} previusPage={previusPage}></Paginas>

      </Container>
      <Footer></Footer>
    </>
  );
}
