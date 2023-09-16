# Parking

Aquí tienes un archivo README.md para tu proyecto de gestión de estacionamiento:

```markdown
# Gestión de Estacionamiento - API Node.js

Este proyecto es una API simple construida con Node.js y Express que permite realizar operaciones básicas (CRUD) en una simulación de lugares de estacionamiento en un estacionamiento.

## Enlaces

- [Enlace a la API en AWS](http://18.223.164.115:3000/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Instala Node.js y npm en tu máquina.

2. Clona el repositorio a tu máquina local:

   ```shell
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

3. Navega hasta la carpeta del proyecto:

   ```shell
   cd tu-repositorio
   ```

4. Instala las dependencias del proyecto:

   ```shell
   npm install
   ```

## Uso

1. Inicia el servidor ejecutando:

   ```shell
   npm start
   ```

2. El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

3. Utiliza las siguientes rutas para interactuar con la API:

### Endpoints

- `GET /estacionamientos`: Devuelve el estado de todos los lugares de estacionamiento en el estacionamiento.

- `GET /estacionamientos/:indice`: Devuelve el estado de un lugar de estacionamiento específico en el estacionamiento.

- `PUT /estacionamiento/asignar`: Asigna automáticamente un lugar de estacionamiento disponible.

  **Cuerpo de la solicitud de ejemplo:**

  ```json
  {
    "tipoLugar": "grande"
  }
  ```

- `PUT /estacionamiento/costo/:indice`: Calcula el costo y libera un lugar de estacionamiento específico.

  **Cuerpo de la solicitud de ejemplo:**

  ```json
  {
    "minutosEstacionado": 120
  }
  ```

## Configuración

Puedes configurar el servidor para utilizar tu propia base de datos MySQL modificando la variable de conexión en el código para incluir tu propia información de la base de datos:

```javascript
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'NOMBRE_DE_TU_BASE_DE_DATOS'
});
```

Reemplaza los valores para `host`, `user`, `password` y `database` con los de tu propia base de datos.

## Contribución

Siéntete libre de contribuir a este proyecto mediante la presentación de solicitudes de extracción (pull requests) o informando de problemas (issues).
```

Asegúrate de reemplazar `tu-usuario` y `tu-repositorio` con la URL correcta de tu repositorio de GitHub y personalizar la sección de configuración según tus necesidades.
