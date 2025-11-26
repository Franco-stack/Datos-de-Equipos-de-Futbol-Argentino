import { Box, Typography } from "@mui/material";
import { useFavoritos } from "../hooks/useFavoritos";
import { useEffect, useState } from "react";
import axios from "axios";
import { Equipo } from "../components/interfaces";
import EquipoFutbol from "../components/card";

// Componentes y efectos de Swiper (carrusel)
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Estilos base de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function FavoritosPage() {
  
  // Traigo todo lo relacionado a favoritos desde el hook personalizado.
  // Esto mantiene toda la lógica centralizada y el componente queda más limpio.
  const { favoritos, toggleFavorito, esFavorito } = useFavoritos();

  // Se guardA la lista completa de equipos cargados desde el JSON remoto.
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  // Carga inicial de los equipos. Solo se ejecuta una vez.
  useEffect(() => {
    axios
      .get<{ equipos: Equipo[] }>(
        "https://raw.githubusercontent.com/Franco-stack/ds-jason-Futbol/refs/heads/main/db.json"
      )
      .then((res) => setEquipos(res.data.equipos));
  }, []);

  // Filtro los equipos que coinciden con los IDs guardados en favoritos.
  const filtrados = equipos.filter((e) => favoritos.includes(Number(e.id)));

  return (
    <Box sx={{ p: 4 }}>
      
      {/* Título principal de la página */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "black",
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          fontWeight: "bold",
          fontSize: "2.4rem",
        }}
      >
        Mis Equipos Favoritos
      </Typography>

      {/* Si no hay favoritos, muestra un mensaje */}
      {filtrados.length === 0 ? (
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            color: "#777",
            fontSize: 22,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Todavía no agregaste favoritos ❤️
          </Typography>
          <Typography variant="body1">
            Tocá el corazón en cualquier equipo para guardarlo acá.
          </Typography>
        </Box>
      ) : (
        
        // Si hay favoritos, muestro el carrusel con los equipos 
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"              // Efecto de coverflow
          centeredSlides                  // Centra el slide activo
          grabCursor                      // Cambia el cursor al pasar sobre el carrusel
          slidesPerView={"auto"}          // Cantidad de slides visibles según el tamaño
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }} // Bolitas clickeables de paginación
          navigation                       // Botones de siguiente/anterior
          style={{ paddingBottom: "60px" }}
        >

          {/* Renderizo cada equipo favorito dentro de un Slide */}
          {filtrados.map((d) => (
            <SwiperSlide
              key={d.id}
              style={{
                width: "270px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <EquipoFutbol
                equipo={d}
                esFavorito={esFavorito(Number(d.id))}
                toggleFavorito={() => toggleFavorito(Number(d.id))}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
