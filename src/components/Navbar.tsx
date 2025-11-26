import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

// Navbar principal de la aplicación, muestra el título y dos enlaces: Inicio y Favoritos.
export default function Navbar() {
  // Hook para saber en qué ruta estoy parado y poder resaltar el link activo.
  const location = useLocation();

  // Estilo base de todos los links del navbar.
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    marginLeft: "20px",
    fontSize: "16px",
    fontWeight: 500,
    transition: "0.3s",
  };
  const activeStyle = {
    color: "#00e5ff",
    textDecoration: "underline",
    fontWeight: 600,
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0d0d0d",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Título que aparece en el navbar*/}
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          FUTBOL ARG 🏆
        </Typography>

        {/* Contenedor de los links */}
        <Box>
          <Link
            to="/"
            style={{
              ...linkStyle,
              ...(location.pathname === "/" ? activeStyle : {}),
            }}
          >
            INICIO
          </Link>
          <Link
            to="/favoritos"
            style={{
              ...linkStyle,
              ...(location.pathname === "/favoritos" ? activeStyle : {}),
            }}
          >
            FAVORITOS
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
