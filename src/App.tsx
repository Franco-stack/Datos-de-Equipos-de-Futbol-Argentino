import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Container from "./components/container";
import axios from "axios";
import { Equipo } from "./components/interfaces";
import EquipoFutbol from "./components/card";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Buscador from "./components/Filter";
import { useFavoritos } from "./hooks/useFavoritos";
import FiltrosChips from "./components/FiltrosChips";
import Navbar from "./components/Navbar";

/* ============================================================
   Función de búsqueda
   Filtra equipos según texto ingresado combinando nombre, estadio,
   historia y otros campos. Se arma un string grande para buscar todo.
============================================================ */
const buscarEquipos = (equipos: Equipo[], texto: string): Equipo[] => {
  const textoNormalizado = texto.trim().toLowerCase();
  if (!textoNormalizado) return equipos;

  return equipos.filter((equipo) => {
    const criterio = [
      equipo.nombre,
      equipo.estadio,
      equipo.clasico_rival,
      equipo.ultimo_titulo,
      equipo.historia,
      equipo.fundacion,
      String(equipo.cantidad_titulos),
      equipo.historia,
    ]
      .join(" ")
      .toLowerCase();

    return criterio.includes(textoNormalizado);
  });
};

/* ============================================================
   Ordenamientos disponibles
============================================================ */
const ordenarEquipos = (equipos: Equipo[], criterio: string): Equipo[] => {
  const copia = [...equipos];

  switch (criterio) {
    case "alfabetico":
      return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));

    case "titulos":
      return copia.sort((a, b) => b.cantidad_titulos - a.cantidad_titulos);

    case "antiguedad":
      return copia.sort(
        (a, b) =>
          new Date(a.fundacion).getTime() - new Date(b.fundacion).getTime()
      );

    case "nuevos":
      return copia.sort(
        (a, b) =>
          new Date(b.fundacion).getTime() - new Date(a.fundacion).getTime()
      );

    default:
      return equipos;
  }
};

/* ============================================================
   Aplicación de filtros (chips)
============================================================ */
const aplicarFiltros = (equipos: Equipo[], filtros: any): Equipo[] => {
  let resultado = [...equipos];

  // Filtrar "Cinco Grandes"
  if (filtros.grandes) {
    const cincoGrandes = [
      "River Plate",
      "Boca Juniors",
      "Racing Club",
      "Independiente",
      "San Lorenzo",
    ];
    resultado = resultado.filter((e) => cincoGrandes.includes(e.nombre));
  }

  // Filtro por ubicación (Interior vs CABA)
  if (filtros.interior) {
    resultado = resultado.filter(
      (e) =>
        ![
          "Buenos Aires",
          "Ciudad Autónoma de Buenos Aires",
          "Avellaneda",
          "Lanús",
          "Liniers",
          "Boedo",
          "Flores",
          "La Boca",
        ].some((loc) => e.estadio.toLowerCase().includes(loc.toLowerCase()))
    );
  }
  if (filtros.muchosTitulos) {
    resultado = resultado.filter((e) => e.cantidad_titulos > 30);
  }
  if (filtros.antiguos) {
    resultado = resultado.filter(
      (e) => new Date(e.fundacion).getFullYear() < 1950
    );
  }
  if (filtros.internacionales) {
    resultado = resultado.filter((e) =>
      [
        "Libertadores",
        "Sudamericana",
        "Intercontinental",
        "Conmebol",
        "Recopa",
      ].some((word) => e.historia.includes(word))
    );
  }

  return resultado;
};

function App() {
  // Datos cargados del JSON remoto
  const [data, setData] = useState<Equipo[]>([]);

  // Texto ingresado en el buscador
  const [searchText, setSearchText] = useState<string>("");

  // Orden seleccionado por el usuario
  const [orden, setOrden] = useState<string>("alfabetico");

  // Sistema de favoritos (localStorage)
  const { toggleFavorito, esFavorito } = useFavoritos();

  // Filtros aplicados a los equipos
  const [filtros, setFiltros] = useState({
    grandes: false,
    interior: false,
    muchosTitulos: false,
    antiguos: false,
    internacionales: false,
  });

  /* ============================================================
      Carga inicial de datos desde el Raw de GitHub
  ============================================================ */
  useEffect(() => {
    axios
      .get<{ equipos: Equipo[] }>(
        "https://raw.githubusercontent.com/Franco-stack/ds-jason-Futbol/refs/heads/main/db.json"
      )
      .then((response) => {
        setData(response.data.equipos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  /* ============================================================
    Memo para no recalcular filtros si no cambia algo
  ============================================================ */
  const equiposFiltrados = useMemo(() => {
    let filtrados = buscarEquipos(data, searchText);
    filtrados = aplicarFiltros(filtrados, filtros);
    filtrados = ordenarEquipos(filtrados, orden);

    return filtrados;
  }, [data, searchText, orden, filtros]);

  /* ============================================================
    Actualización del buscador
  ============================================================ */
  const handleSearchChange = useCallback((nuevoTexto: string) => {
    setSearchText(nuevoTexto);
  }, []);

  /* ============================================================
     Vista general, buscador, filtros y cards.
  ============================================================ */
  return (
    <div className="App">
      <Navbar />

      <header
        className="App-header"
        style={{
          paddingTop: "90px",
          paddingBottom: "40px",
        }}
      >
        <Container>
          {/* Título principal */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "white",
              fontFamily: "Oswald, sans-serif",
              textAlign: "center",
              mt: 6,
              mb: 5,
              fontSize: { xs: "40px", sm: "48px", md: "64px" },
              fontWeight: 300,
              letterSpacing: "1px",
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.45)",
            }}
          >
            <span style={{ fontWeight: 300 }}>Futbol</span>{" "}
            <span style={{ fontWeight: 700 }}>Argentino</span>
          </Typography>

          {/* Buscador */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Buscador
              onSearchChange={handleSearchChange}
              searchText={searchText}
            />
          </Box>

          {/* Orden + Filtros */}
          <Box
            sx={{
              mt: 4,
              mb: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Select de ordenamiento */}
            <Select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                borderRadius: 2,
                width: "260px",
                height: "45px",
                "& .MuiSvgIcon-root": { color: "white" },
                fontSize: "15px",
                boxShadow: "0 0 5px rgba(255,255,255,0.15)",
              }}
            >
              <MenuItem value="alfabetico">Alfabético (A-Z)</MenuItem>
              <MenuItem value="titulos">Más títulos</MenuItem>
              <MenuItem value="antiguedad">Más antiguos</MenuItem>
              <MenuItem value="nuevos">Más nuevos</MenuItem>
            </Select>

            {/* Chips de filtros */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
                maxWidth: "900px",
              }}
            >
              <FiltrosChips filtros={filtros} setFiltros={setFiltros} />
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#DDDDDD" }}>
              Podés buscar por nombre del equipo, estadio, clásico rival,
              título, año o incluso palabras de la historia.
            </Typography>
          </Box>
          {/* Cantidad de equipos encontrados */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#CCCCCC",
              mb: 2,
              fontWeight: 300,
              letterSpacing: 1,
            }}
          >
            {equiposFiltrados.length} EQUIPOS ENCONTRADOS
          </Typography>

          {/* GRID de equipos */}
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              mt: 2,
              px: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {equiposFiltrados.map((d: Equipo) => (
              <EquipoFutbol
                key={d.id}
                equipo={d}
                esFavorito={esFavorito(Number(d.id))}
                toggleFavorito={() => toggleFavorito(Number(d.id))}
              />
            ))}
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;
