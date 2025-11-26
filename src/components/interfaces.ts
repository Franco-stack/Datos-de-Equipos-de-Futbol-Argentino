// Interface principal que define la estructura de un equipo de fútbol.
// Se usa en toda la app para mantener tipado fuerte y evitar errores.
export interface Equipo {
  // ID único del equipo dentro del JSON.
  // Viene como string desde la base, por eso no se parsea aquí.
  id: string;
  nombre: string;
  estadio: string;
  fundacion: string;
  clasico_rival: string;
  ultimo_titulo: string;
  cantidad_titulos: number;
  historia: string;
}
