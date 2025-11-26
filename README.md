Futbol Argentino – React + TypeScript + MUI

Aplicación web interactiva que muestra todos los equipos del fútbol argentino, con búsqueda avanzada, filtros dinámicos, favoritos guardados en el navegador y una interfaz moderna.  
Este proyecto fue desarrollado con React + TypeScript, usando Material UI, Swiper, Framer Motion y un JSON remoto alojado en GitHub.

---
Tecnologías utilizadas

- **React + TypeScript**
- **Material UI (MUI)** para el diseño visual
- **Swiper.js** para el carrusel de favoritos
- **Framer Motion** para animaciones suaves
- **Axios** para consumir el JSON remoto
- **LocalStorage** para guardar favoritos
- **React Router** para navegación interna

---

Objetivo del proyecto

Construir una app rápida, moderna y agradable visualmente que permita:

- Buscar equipos por nombre, estadio, historia, rival, etc.
- Ordenarlos por títulos, antigüedad o alfabéticamente.
- Aplicar filtros tipo “chips” de forma instantánea.
- Ver una página de detalle con datos completos del club.
- Guardar favoritos con persistencia usando `localStorage`.

---

Vista previa del proyecto

Pantalla principal (Home)
Incluye buscador, ordenamiento, filtros y cards minimalistas.

Página de Favoritos
Presentada como un carrusel animado con efecto “coverflow”.

Detalle de equipo
Contiene banner dinámico, historia completa, títulos y datos rápidos.

---
Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/TU-REPO.git

# Entrar al directorio
cd TU-REPO

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# La app corre en:
http://localhost:3000


#Estructura del proyecto
src/
│
├── components/
│   ├── card.tsx               # Tarjeta individual de cada equipo
│   ├── DetalleEquipo.tsx      # Página de detalle
│   ├── Filter.tsx             # Buscador
│   ├── FiltrosChips.tsx       # Chips de filtros
│   ├── Navbar.tsx             # Barra superior
│   └── container.tsx          # Contenedor responsive
│
├── pages/
│   └── Favoritos.tsx          # Carrusel de favoritos
│
├── hooks/
│   └── useFavoritos.ts        # Manejo de favoritos con localStorage
│
├── utils/
│   └── teamColors.ts          # Colores para el banner (detalle del equipo)
│
├── App.tsx                    # Pantalla principal (listado)
└── AppRouter.tsx              # Rutas de la aplicación

# La app consume directamente:
https://raw.githubusercontent.com/Franco-stack/ds-jason-Futbol/main/db.json

#Licencia
Este proyecto es libre de usar y modificar con fines educativos o personales.

#Autor
Desarrollado por Franco (GitHub: Franco-stack).
Proyecto creado para practicar React + TypeScript + UI moderna.