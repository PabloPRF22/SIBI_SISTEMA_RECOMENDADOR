import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography,Container,IconButton } from "@mui/material";
export default function getPaginas({page,nextPage,previusPage}){
    return(
        <Container
        sx={{ height: "50px", display: "flex", width: "100%", mb: "30px" }}
      >
        <IconButton sx={{ marginRight: "auto" }} onClick={previusPage}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography sx={{ mx: "auto", fontWeight: "bold" }}>
          {page + 1}
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={nextPage}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Container>
    )
}