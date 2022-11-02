import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.5,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};
export default function Cargando({ displayCargando,displayVacio}) {
  useEffect(()=>{
    console.log(displayVacio)
  },[displayVacio])
  return (
    <Container
      sx={{
        display: displayCargando,
        height: "calc(100vh - 224px)",
        minWidth: "100%",
      }}
    >
    <Typography sx ={{display: displayVacio, m:"auto"}}> No hay alojamientos</Typography>

      <div
        style={{
          display: displayVacio =="none" ? "flex":"none",
          paddingTop: "5rem",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={LoadingContainer}
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div>
    </Container>
  );
}
