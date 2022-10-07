import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer(){
    let styles = {
        footer: {
          backgroundColor: "#D3D3D3",
          minWidth: "100%",
        },
      };
    return (
        <Container disableGutters sx={styles.footer}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      );
}

