import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

// Props del buscador: texto actual y callback para actualizarlo
interface BuscadorProps {
  searchText: string;
  onSearchChange: (nuevoTexto: string) => void;
}

export default function Buscador({ searchText, onSearchChange }: BuscadorProps) {
  // cada vez que se escribe, se actualiza el estado del padre
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "650px", 
        mx: "auto",   
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar equipo..."
        value={searchText}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#AAAAAA", fontSize: 26 }} />
            </InputAdornment>
          ),

          // estilos custom: borde redondo, blur, efectos y transición
          sx: {
            borderRadius: "40px",
            height: "56px",
            color: "white",
            paddingLeft: "10px",
            bgcolor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(6px)",      
            transition: "0.3s ease",
            "& fieldset": {
              borderRadius: "40px",
              borderColor: "rgba(255,255,255,0.15)",
            },
            "&:hover fieldset": {
              borderColor: "#00e5ff99",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00e5ff",
              boxShadow: "0 0 8px #00e5ff88",
            },
          },
        }}
        InputLabelProps={{
          sx: { color: "#CCCCCC" },
        }}
        sx={{
          "& input": {
            color: "white",
            fontSize: "17px",
            fontWeight: 400,
          },
        }}
      />
    </Box>
  );
}
