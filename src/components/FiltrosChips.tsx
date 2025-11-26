import { Box } from "@mui/material";

// Props: el estado actual de filtros y la función para actualizarlos
interface Props {
  filtros: any;                   
  setFiltros: (value: any) => void;
}

export default function FiltrosChips({ filtros, setFiltros }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",      
        justifyContent: "center",
        gap: 1.5,                
        mb: 3,
        mt: 2,
      }}
    >
      {[
        { key: "grandes", label: "5 Grandes" },
        { key: "interior", label: "Interior" },
        { key: "muchosTitulos", label: "+30 Títulos" },
        { key: "antiguos", label: "Antes de 1950" },
        { key: "internacionales", label: "Internacionales" },
      ].map((filtro) => {
        
        // chequeo rápido de si el filtro está activado para pintarlo distinto
        const activo = filtros[filtro.key];

        return (
          <Box
            key={filtro.key}
            onClick={() =>
              // toggle del filtro: si estaba en true → false y viceversa
              setFiltros({ ...filtros, [filtro.key]: !filtros[filtro.key] })
            }
            sx={{
              px: 2.5,          
              py: 1,              
              borderRadius: "20px",
              fontSize: "0.9rem",
              cursor: "pointer",
              userSelect: "none",  

              // estilos del borde, cambian si está activo o no
              border: activo
                ? "2px solid #00E5FF"
                : "2px solid rgba(255,255,255,0.2)",

              // color tipográfico según estado
              color: activo ? "#00E5FF" : "white",

              // fondo estilo “glass” con dos versiones
              bgcolor: activo
                ? "rgba(0,229,255,0.12)"
                : "rgba(255,255,255,0.05)",

              transition: "all 0.25s ease",

              // hover suave con levantamiento visual
              ":hover": {
                bgcolor: activo
                  ? "rgba(0,229,255,0.18)"
                  : "rgba(255,255,255,0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {filtro.label}
          </Box>
        );
      })}
    </Box>
  );
}
