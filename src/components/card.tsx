import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Equipo } from "./interfaces";
import { getImageById } from "./function/function";
import { Link } from "react-router-dom";

// Props que recibe la card: los datos del equipo y el estado del favorito
interface CardProps {
  equipo: Equipo;
  esFavorito?: boolean;
  toggleFavorito?: () => void;
}

export default function EquipoFutbol({
  equipo,
  esFavorito,
  toggleFavorito,
}: CardProps) {

  // Maneja el click del corazón, sin activar el click del Link
  const marcarFavorito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorito) toggleFavorito();
  };

  return (
    // Todo el card es clickeable y lleva al detalle del equipo
    <Link
      to={`/equipo/${equipo.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          width: 260,
          height: 330,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
          bgcolor: "#ffffff",
          transition: "all 0.25s ease",

          // Animación al pasar el mouse
          ":hover": {
            transform: "translateY(-6px)",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.35)",
          },
        }}
      >

        {/* Escudo del equipo — con leve zoom al hacer hover */}
        <CardMedia
          component="img"
          image={getImageById(equipo.id)}
          alt={equipo.nombre}
          sx={{
            width: 140,
            height: 140,
            objectFit: "contain",
            mt: 1,
            transition: "transform 0.25s ease",
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.25))",

            // El zoom sólo se activa cuando el card tiene hover
            ".MuiCard-root:hover &": {
              transform: "scale(1.06)",
            },
          }}
        />

        {/* Nombre del equipo */}
        <CardContent sx={{ p: 0, minHeight: 40 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "#222",
            }}
          >
            {equipo.nombre}
          </Typography>
        </CardContent>

        {/* Botón de favorito (corazón) */}
        <CardActions sx={{ p: 0 }}>
          <IconButton
            onClick={marcarFavorito}
            sx={{
              color: esFavorito ? "red" : "#999",
              transition: "transform 0.25s ease, color 0.25s ease",
              transform: esFavorito ? "scale(1.25)" : "scale(1)",

              // Pequeño rebote cuando se hace click
              ":active": {
                transform: "scale(1.35)",
              },
            }}
          >
            <FavoriteIcon
              sx={{
                fontSize: 28,
                transition: "transform 0.25s ease",
                transform: esFavorito ? "scale(1.25)" : "scale(1)",
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
