import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface ContainerProps {
  children: React.ReactNode; // lo que envuelvo dentro del contenedor
}

// Estilos base para el contenedor principal
// Lo dejo minimalista porque el layout final se define con el sx del Box
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

// Componente contenedor general del proyecto
// La cual sirve para centrar y limitar el ancho del contenido
const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      sx={{
        width: "100%",
        maxWidth: "1200px",   
        margin: "0 auto",     
        padding: "0 20px",    
      }}
    >
      {props.children}
    </Box>
  );
};

export default Container;
