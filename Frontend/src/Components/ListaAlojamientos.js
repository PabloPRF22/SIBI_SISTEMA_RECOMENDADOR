import AlojamientoCard from "../Components/AlojamientoCard";
import { Grid } from "@mui/material";
import { useEffect } from "react";
export default function ListaAlojamientos({alojFracc}){
    useEffect(()=>{
      console.log(alojFracc)
    },[alojFracc])
    return(
        
        <Grid
          width="100%-100px"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 2, md: 2 }}
        >
          {alojFracc.map((alojamiento, index) => {
            return (
              <Grid xs={2} sm={4} md={4} key={index} item>
                <AlojamientoCard alojamiento={alojamiento}></AlojamientoCard>
              </Grid>
            );
          })}
        </Grid>
    )
}