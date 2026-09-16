# New Talents — Demo visual responsive

Prototipo frontend del pasaporte deportivo de New Talents. Funciona como una aplicación web responsive: ocupa el navegador completo en escritorio y se adapta a la pantalla del celular sin simular un dispositivo.

## Contenido

- Resumen del jugador.
- Estadísticas orientadas a scouts.
- Historial de partidos.
- Evidencia audiovisual.
- Filtros, selector de periodo y modales demostrativos.
- Datos locales de muestra; no requiere backend, base de datos ni Docker.

## Ejecutar localmente

```powershell
npm install
npm run dev
```

Abre la URL indicada por Vite, normalmente `http://localhost:5173`.

## Compilar

```powershell
npm run build
```

La salida estática compatible con Vercel queda en `dist/client`.

## Desplegar en Vercel

1. Sube esta carpeta a un repositorio Git.
2. Importa el repositorio en Vercel.
3. Vercel utilizará `vercel.json`, ejecutará `npm run build` y publicará `dist/client`.

No se requieren variables de entorno para esta demostración visual.
