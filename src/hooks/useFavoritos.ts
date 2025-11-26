import { useState, useEffect } from "react";

// Hook para manejar la lógica de favoritos.
// Este hook centraliza toda la funcionalidad relacionada a:
// - guardar favoritos
// - cargar favoritos desde localStorage
// - agregar o quitar un favorito
// - verificar si un equipo es favorito
export function useFavoritos() {

  // Estado local donde guardo la lista de IDs favoritos.
  // Se inicializa leyendo desde localStorage, así los favoritos
  // no se pierden cuando se recarga la página.
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });

  // Cada vez que la lista de favoritos cambia,
  // se guarda automáticamente en localStorage.
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // - Si el ID ya está en la lista → lo quita
  // - Si no está → lo agrega
  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id) 
        : [...prev, id]              
    );
  };

  // Devuelve true si el equipo está marcado como favorito.
  const esFavorito = (id: number): boolean => {
    return favoritos.includes(id);
  };
  return { favoritos, toggleFavorito, esFavorito };
}
