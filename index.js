const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Middleware para manejar datos JSON en las solicitudes
app.use(bodyParser.json());

// Simulación de lugares de estacionamiento (0 para vacío, 1 para ocupado)
let lugaresEstacionamiento = Array(30).fill(0);


function obtenerEstadoLugar(indice) {
  if (isNaN(indice) || indice < 0 || indice >= lugaresEstacionamiento.length) {
    return null;
  }

  const estado = lugaresEstacionamiento[indice];
  const tipo = indice % 10 === 9 ? 'discapacitado' : indice % 2 === 0 ? 'grande' : 'chico';
 
  return {
    numero: indice + 1,
    tipo: tipo,
    estado: estado === 0 ? 'vacío' : 'ocupado',
    
  };
}

function calcularPrecio(minutosEstacionado) {
  const horasEstacionado = minutosEstacionado / 60; // Convertir a horas
  const precioPorHora = 15; // Precio por hora en pesos
  return Math.floor(horasEstacionado) * precioPorHora; // Redondear a horas y calcular el precio
}


// Ruta para obtener el estado de un lugar de estacionamiento específico
app.get('/estacionamientos/:indice', (req, res) => {
  const indice = parseInt(req.params.indice) - 1; // Restamos 1 para que el índice comience desde 0
  const lugarSeleccionado = obtenerEstadoLugar(indice);

  if (!lugarSeleccionado) {
    res.status(400).json({ error: 'Índice no válido' });
    return;
  }

  res.json(lugarSeleccionado);
});


// Ruta para obtener el estado de todos los lugares de estacionamiento
app.get('/estacionamientos', (req, res) => {
  const estadoEstacionamiento = lugaresEstacionamiento.map((estado, indice) => obtenerEstadoLugar(indice));

  res.json(estadoEstacionamiento);
});


// API para asignar automáticamente un lugar disponible
app.put('/estacionamiento/asignar', (req, res) => {
  const { tipoLugar } = req.body; // Tipo de lugar (grande, chico o discapacitado)
  
  if (!['grande', 'chico', 'discapacitado'].includes(tipoLugar)) {
    res.status(400).json({ error: 'Tipo de lugar no válido' });
    return;
  }

  let indiceDisponible = -1;

  if (tipoLugar === 'discapacitado') {
    // Si es "discapacitado", buscar el primer lugar disponible de tipo discapacitado (múltiplos de 10)
    indiceDisponible = lugaresEstacionamiento.findIndex(
      (estado, indice) => estado === 0 && (indice + 1) % 10 === 0
    );
  } else if (tipoLugar === 'chico') {
    // Si es "chico", buscar el primer lugar disponible de tipo chico (números impares, excluyendo múltiplos de 10)
    indiceDisponible = lugaresEstacionamiento.findIndex(
      (estado, indice) => estado === 0 && indice % 2 === 1 && (indice + 1) % 10 !== 0
    );
  } else if (tipoLugar === 'grande') {
    // Si es "grande", buscar el primer lugar disponible de tipo grande (números pares, excluyendo múltiplos de 10)
    indiceDisponible = lugaresEstacionamiento.findIndex(
      (estado, indice) => estado === 0 && indice % 2 === 0 && (indice + 1) % 10 !== 0
    );
  }

  if (indiceDisponible === -1) {
    res.status(400).json({ error: 'No hay lugares disponibles del tipo especificado' });
    return;
  }

  lugaresEstacionamiento[indiceDisponible] = 1;

  

  res.json({ mensaje: `Se te ha asignado el cajón de estacionamiento ${indiceDisponible + 1}` });
});


// Ruta para calcular el costo y liberar un lugar de estacionamiento
app.put('/estacionamiento/costo/:indice', (req, res) => {
  const index = parseInt(req.params.indice) - 1; // Restamos 1 para que el índice comience desde 0
  const { minutosEstacionado } = req.body; // Minutos estacionados

  if (isNaN(index) || index < 0 || index >= lugaresEstacionamiento.length || lugaresEstacionamiento[index] === 0) {
    res.status(400).json({ error: 'Índice de lugar no válido o el lugar está vacío' });
    return;
  }

  if (minutosEstacionado <= 0) {
    res.status(400).json({ error: 'Los minutos estacionados deben ser mayores que cero' });
    return;
  }

  const costo = calcularPrecio(minutosEstacionado);
  lugaresEstacionamiento[index] = 0; // Cambiar el estado del lugar a vacío

  res.json({ mensaje: `Total a pagar: $${costo}` });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js en funcionamiento en http://localhost:${port}`);
});
