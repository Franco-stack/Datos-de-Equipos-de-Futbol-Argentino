import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Equipo } from "./interfaces";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { getImageById } from "./function/function";
import { teamColors } from "../utils/teamColors";

export default function DetalleEquipo() {
  // id que viene por URL ( /equipo/:id )
  const { id } = useParams();

  // estado local donde guardo al equipo encontrado
  const [equipo, setEquipo] = useState<Equipo | null>(null);

  // cargo el equipo según el id
  useEffect(() => {
    axios
      .get<{ equipos: Equipo[] }>(
        "https://raw.githubusercontent.com/Franco-stack/ds-jason-Futbol/refs/heads/main/db.json"
      )
      .then((res) => {
        // busco el equipo exacto
        const encontrado = res.data.equipos.find(
          (e) => Number(e.id) === Number(id)
        );

        setEquipo(encontrado || null);
      });
  }, [id]);

  // pantalla temporal mientras carga
  if (!equipo) {
    return (
      <Typography
        variant="h4"
        sx={{ mt: 5, textAlign: "center", color: "white" }}
      >
        Cargando...
      </Typography>
    );
  }

  // color personalizado para cada club
  const color = teamColors[Number(equipo.id)] || "#444";

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {/* animación suave al entrar */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: "800px" }}
      >
        {/* Banner del equipo */}
        <Box
          sx={{
            width: "100%",
            height: "200px",
            borderRadius: 3,
            mb: 3,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${color} 0%, #000 80%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 5,
          }}
        >
          {/* Escudo del club al centro */}
          <CardMedia
            component="img"
            image={getImageById(equipo.id)}
            sx={{
              width: 170,
              opacity: 0.95,
            }}
          />
        </Box>

        {/* Tarjeta con toda la información */}
        <Card
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Nombre del club */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
              color: "#222",
            }}
          >
            {equipo.nombre}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Datos principales en dos columnas */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography variant="h6">🏟 Estadio:</Typography>
            <Typography>{equipo.estadio}</Typography>

            <Typography variant="h6">📅 Fundación:</Typography>
            <Typography>{equipo.fundacion}</Typography>

            <Typography variant="h6">🏆 Títulos:</Typography>
            <Typography>{equipo.cantidad_titulos}</Typography>

            <Typography variant="h6">🔥 Clásico:</Typography>
            <Typography>{equipo.clasico_rival}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Historia del club */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Historia del club
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#333", lineHeight: 1.7, whiteSpace: "pre-line" }}
          >
            {equipo.historia}
          </Typography>

          {/* Datos secundarios */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: 600, color: "#111" }}
            >
              Datos rápidos
            </Typography>

            <Typography>⭐ Último título: {equipo.ultimo_titulo}</Typography>
            <Typography>🆔 ID oficial: {equipo.id}</Typography>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}
