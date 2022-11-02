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

export default function MasGustan() {

  const [page, setPage] = useState(0);
  const [numAloj, setNumAloj] = useState(0);
  const [masGustan, setMasGustan] = useState([]);

  const [alojamientos, setAlojamientos] = useState([]);
  const [alojFracc, setAlojFracc] = useState([]);
  const [displayCargando, setDisplayCargando] = useState("flex");
  const [displayVacio, setDisplayVacio] = useState("none");

  const arregloDeArreglos = [];


  function estaVacio(){
        setDisplayVacio("flex")
        setAlojamientos([]);
        setAlojFracc([]);



  }
  useEffect(() => {
    axios
      .get("api/alojamiento/getMasPopulares", {})
      .then((response) => {
        setNumAloj(response.data.length);

        if(response.data.length>0) {
            setDisplayCargando("none");
            const LONGITUD_PEDAZOS = 10; // Partir en arreglo de 3
            for (let i = 0; i < response.data.length; i += LONGITUD_PEDAZOS) {
              let pedazo = response.data.slice(i, i + LONGITUD_PEDAZOS);
              arregloDeArreglos.push(pedazo);
            }
            setAlojamientos(arregloDeArreglos);
            setMasGustan(response.data.length == 0 ? []: arregloDeArreglos[0])
            setAlojFracc(response.data.length == 0 ? []: arregloDeArreglos[0]);
            getRelacionados(arregloDeArreglos[0])
        }else{
            estaVacio()
        }

      })
      .catch((error) => {});
  }, []);
  function getRelacionados(alojamientos){
    if(alojamientos.length >0){
      alojamientos.map((alojamiento)=>{
        console.log(alojamiento)
        axios
        .post("api/alojamiento/getRelacionados", alojamiento)
        .then(function (response) {
          console.log(response)
        })
        .catch((err)=>{
          console.log(err)
        })
      })

    }

  }

  function previusPage() {
    if (page !== 0) {
      const previusPage = page - 1;
      setPage(previusPage);
      setAlojFracc(alojamientos[previusPage]);
    }
  }

  function nextPage() {
    if (page < alojamientos.length-1 ) {
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
        sx={{ minWidth: "100%",minHeight: 'calc(100vh - 70px)' }}
      >
        <Paginas page={page} nextPage = {nextPage} previusPage={previusPage}></Paginas>

        <Cargando displayCargando={displayCargando} displayVacio={displayVacio}></Cargando>
        <ListaAlojamientos alojFracc={alojFracc}></ListaAlojamientos>
      </Container>
      <Footer></Footer>
    </>
  );
}
