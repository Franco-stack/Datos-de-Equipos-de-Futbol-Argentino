import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import DetalleEquipo from "../components/DetalleEquipo";
import FavoritosPage from "../pages/Favoritos";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    // BrowserRouter se encarga de manejar toda la navegación interna
    // sin recargar la página. Es la base del enrutado en React.
    <BrowserRouter>

      {/* Navbar que se muestre en TODAS las páginas */}
      <Navbar />
      <div style={{ paddingTop: "40px" }}>
        <Routes>     
          {/* Página principal donde está el buscador y el listado de equipos */}
          <Route path="/" element={<App />} />
          {/* Página donde mostramos el carrusel con los equipos favoritos */}
          <Route path="/favoritos" element={<FavoritosPage />} />
          {/* Página de detalle: muestra la info completa del equipo seleccionado */}
          <Route path="/equipo/:id" element={<DetalleEquipo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
