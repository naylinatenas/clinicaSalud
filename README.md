README - Clínica Salud

Cumple la estructura mínima solicitada:
- Página 1: index.html (Inicio) -> Presentación + Carrusel (Bootstrap).
- Página 2: especialidades.html -> Tarjetas con especialidades y botón "Reservar Cita".
- Página 3: reserva.html -> Formulario (Nombre, DNI, Especialidad, Fecha y Hora) con validación JS. Muestra confirmación dinámica y toast Bootstrap al crear la cita.
- Página 4: citas.html -> Tabla con todas las citas guardadas (se almacenan en localStorage). Permite cancelar y borrar todo.

Estructura de carpetas:
- css/styles.css (estilos personalizados + Bootstrap desde CDN)
- js/storage.js (utilidades de almacenamiento LocalStorage)
- js/utils.js (utilidades y listado de especialidades)
- js/reserva.js (lógica de formulario y confirmación dinámica)
- js/citas.js (renderizado de tabla de citas y acciones)
- img/inst1.png, inst2.png, inst3.png (imágenes de carrusel)

Cómo probar:
1) Abrir index.html en un navegador moderno.
2) Ir a Especialidades y pulsar "Reservar Cita" o ir directo a Reserva.
3) Completar todos los campos y confirmar. Se verá un mensaje de confirmación y un toast.
4) Ir a "Mis Citas" para ver el listado. Desde ahí se puede cancelar citas o borrar todas.

Notas:
- La persistencia se realiza con LocalStorage del navegador.
- No requiere servidor; funciona solo con archivos estáticos (recomendado abrir con Live Server para evitar restricciones de módulos en algunos navegadores).

GITHUB PAGES LINK -> https://naylinatenas.github.io/clinicaSalud/

GRUPO:07
Integrantes:
   1. Acosta Plasencia, Naylin Atenas
   2. Chuquipoma Medina, Sthefany Darley
   3. Mantilla Sanchez, Elsa Lucia
