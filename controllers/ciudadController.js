// Importar librería para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo ciudad
const Ciudad = models.ciudades;

class CiudadController {
  async createCiudad(req, res) {
    const ciudad = req.body;

    try {
      const ciudadNueva = await Ciudad.create(ciudad);

      res.status(201).json(Respuesta.exito(ciudadNueva, "Ciudad insertada"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear una ciudad nueva: ${ciudad}`));
    }
  }

  async getAllCiudad(req, res) {
    try {
      const data = await Ciudad.findAll(); // Recuperar todas las ciudades
      res.json(Respuesta.exito(data, "Datos de ciudades recuperados"));
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de las ciudades: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteCiudad(req, res) {
    const idciudad = req.params.idciudad;
    try {
      const numFilas = await Ciudad.destroy({
        where: {
          idciudad: idciudad,
        },
      });
      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idciudad));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getCiudadById(req, res) {
    const idciudad = req.params.idciudad;
    try {
      const fila = await Ciudad.findByPk(idciudad);
      if (fila) {
        res.json(Respuesta.exito(fila, "Ciudad recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Ciudad no encontrada"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async updateCiudad(req, res) {
    const ciudad = req.body;
    const idciudad = req.params.idciudad;

    if (idciudad != ciudad.idciudad) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id de la ciudad no coincide"));
    }

    try {
      const numFilas = await Ciudad.update({ ...ciudad }, { where: { idciudad } });

      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + idciudad));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }
}

module.exports = new CiudadController();
