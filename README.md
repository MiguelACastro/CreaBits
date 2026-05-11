
# CreaBits - Compilador Visual

CreaBits es un lenguaje y herramienta de programación visual diseñado para aprender conceptos básicos de lógica de programación a través del dibujo en un lienzo (canvas). Utiliza **[Blockly](https://developers.google.com/blockly)** para la interfaz de bloques y un **[intérprete de JavaScript](https://github.com/NeilFraser/JS-Interpreter)** para ejecutar las acciones en tiempo real.

## Comandos del proyecto

Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run start
   ```
   Esto abrirá la aplicación en `http://localhost:8080` con recarga automática.

3. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Genera una versión optimizada y minificada en la carpeta `dist/`.

4. **Desplegar en GitHub Pages**:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

## Estructura del Código

- `src/blocks/creaBits.js`: Definición visual y lógica de los bloques personalizados.
- `src/generators/creaBits.js`: Traduce los bloques a código JavaScript ejecutable.
- `src/toolbox.js`: Define las categorías y los bloques disponibles en el menú lateral.
- `src/index.js`: Configura Blockly, el intérprete de JS y el canvas.
- `src/serialization.js`: Maneja el guardado y carga del espacio de trabajo en el localStorage.

