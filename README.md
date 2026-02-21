# Emulador-Michi

Michi Emulator incluye un **launcher/configurador** web para preparar tu entorno de emulación en PC.

## Importante (lo que pediste)

- El proyecto viene **sin keys y sin firmware**.
- Tú debes sacar tus archivos desde tu propia Nintendo Switch y ponerlos en tu PC.
- El emulador se maneja como un `.exe` con sus dependencias `.dll`.
- Este launcher solo guarda rutas/configuración para que todo quede ordenado.

## Qué incluye este proyecto

- Interfaz con logo de Michi.
- Configuración de:
  - Ruta del ejecutable `.exe` del emulador.
  - Ruta de carpeta con `.dll` del emulador.
  - Carpeta de juegos `.nsp` / `.xci`.
  - Ruta de `prod.keys` (archivo propio del usuario).
  - Ruta de firmware (archivo propio del usuario).
  - Backend gráfico (`Vulkan`/`OpenGL`).
- Exportación de configuración en `launcher-config.json`.
- Plantilla de estructura de carpetas tipo launcher portable (`.exe` + `.dll`).
- Generador de comando para ejecutar un `.nsp`/`.xci` con tu emulador (copiar/pegar en Windows).

## Qué NO incluye

- No incluye emulador de Nintendo Switch.
- No incluye ni instala `keys`, firmware ni juegos.
- No descarga contenido protegido por copyright.

## Uso

1. Abre `index.html` en tu navegador.
2. Completa rutas de tu `.exe`, carpeta `.dll`, juegos, `prod.keys` y firmware.
3. En "Ejecutar juego", pon la ruta del `.nsp` o `.xci`.
4. Genera y copia el comando de inicio.
5. Pégalo en Windows para abrir el emulador con ese juego.


## Nota sobre ejecución

Por seguridad del navegador, esta versión web no lanza procesos `.exe` directamente. En su lugar genera el comando para que lo ejecutes tú en tu PC.
