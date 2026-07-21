# Plan — Sitio web RBU Santiago

Vamos a reemplazar la pantalla de mantención por el sitio completo de 7 páginas, siguiendo el brandbook oficial RBU (azul `#0047BA`, rojo `#F42534`, grises `#5C6670` y `#A4A9AD`), tipografías **Dosis** (Google Fonts) y **Bebas Neue** como reemplazo de Doublepluss para displays.

## 1. Fundamentos de diseño
- Actualizar `src/styles.css`: tokens semánticos en OKLCH con los colores oficiales RBU (primary=azul, accent=rojo, secondary=grises), radios y variables de marca.
- Cargar Dosis + Bebas Neue vía `<link>` en `src/routes/__root.tsx` (preconnect + stylesheet). Registrar `--font-display` (Bebas Neue) y `--font-sans` (Dosis) en `@theme`.
- Componente `ConnectivityLine` reutilizable (línea horizontal con círculos en extremos) en azul/rojo/gris.
- Componente `BusWheel` decorativo (fragmento circular azul, esquina).
- Logo RBU: SVG inline con silueta de bus + "RBU" + slogan "Nos movemos contigo" bajo la línea de conectividad. Versiones color y blanco.

## 2. Estructura de rutas (TanStack Router, file-based)
```
src/routes/
  __root.tsx           → layout con Navbar sticky + Footer + <Outlet/>
  index.tsx            → Inicio
  recorridos.tsx       → Recorridos
  ofertas-laborales.tsx→ Ofertas Laborales
  mesa-de-ayuda.tsx    → Mesa de Ayuda
  reclamos.tsx         → Reclamos / Sugerencias / Felicitaciones (tabs)
  quienes-somos.tsx    → ¿Quiénes somos?
  datos-personales.tsx → Datos Personales
```
Cada ruta con su `head()` (title, description, og:title, og:description) en español.

## 3. Layout global (`__root.tsx`)
- Navbar sticky: logo RBU a la izquierda + links a las 7 páginas a la derecha, con la línea de conectividad azul en el borde inferior. Menú hamburguesa en móvil (shadcn Sheet).
- Footer 3 columnas (logo+slogan / links / contacto+redes) sobre azul RBU oscuro.

## 4. Páginas
- **Inicio**: hero azul con rueda decorativa, título en Bebas Neue, botones rojo/outline blanco; sección estadísticas (7 tarjetas); sección valores (3 atributos azules + 3 destinos rojos).
- **Recorridos**: intro + iframe Google Maps de Santiago nororiente + dos bloques (Unidad 6 y Unidad 4) con grillas de chips azules linkados a red.cl (`?codser=CODIGO`, target=_blank). Chips `444` y `B43` en gris con tooltip "Mapa próximamente".
- **Ofertas Laborales**: hero azul + formulario shadcn (react-hook-form + zod). Validación RUT `XXXXXXXX-X`, email, campo condicional "Otro tipo de licencia", checkboxes obligatorios, upload PDF/DOC/DOCX. `onSubmit` solo muestra toast (sin backend).
- **Mesa de Ayuda**: hero azul + botón grande blanco/borde azul enlazando a SpeakUp en nueva pestaña.
- **Reclamos**: `Tabs` shadcn con 3 pestañas (Reclamos / Sugerencias / Felicitaciones). Selects con las listas de comunas y servicios exactas. Caja gris al pie del tab Reclamos con OIRS y DTPM.
- **¿Quiénes somos?**: hero + timeline vertical (2003, 2004, 2007, 2011, hoy) con línea de conectividad + dos tarjetas Misión/Visión con borde superior rojo.
- **Datos Personales**: `Accordion` shadcn con los 6 ítems.

## 5. Detalles técnicos
- Todos los formularios: `react-hook-form` + `zod` + shadcn Form. `onSubmit` muestra `toast` de éxito y resetea (sin lógica de negocio).
- Sin backend: no se activa Lovable Cloud en esta pasada. Cuando pidan envío real de formularios, se agrega.
- Accesibilidad: labels asociados, focus visible, contraste AA, aria en botones/links externos.
- Responsive mobile-first con clases Tailwind.
- Todos los enlaces externos (`red.cl`, SpeakUp) con `target="_blank" rel="noopener noreferrer"`.
- Se elimina el contenido actual de mantención de `index.tsx` y `__root.tsx`.

## Notas
- Doublepluss no es una fuente web disponible, uso **Bebas Neue** como especificaste.
- No se incluyen fotos reales (no fueron provistas); se usan bloques gráficos con colores de marca en lugar de placeholders genéricos.
- Si más adelante quieres envío real de formularios (email/DB), activamos Lovable Cloud.
