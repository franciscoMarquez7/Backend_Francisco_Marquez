// Importar librería para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo monumento
const Monumento = models.monumentos;

class MonumentoController {
  async createMonumento(req, res) {
    const monumento = req.body;

    try {
      const monumentoNuevo = await Monumento.create(monumento);

      res.status(201).json(Respuesta.exito(monumentoNuevo, "Monumento insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un monumento nuevo: ${monumento}`));
    }
  }

  async getAllMonumento(req, res) {
    try {
      const data = await Monumento.findAll(); // Recuperar todos los monumentos
      res.json(Respuesta.exito(data, "Datos de monumentos recuperados"));
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los monumentos: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteMonumento(req, res) {
    const idmonumento = req.params.idmonumento;
    try {
      const numFilas = await Monumento.destroy({
        where: {
          idmonumento: idmonumento,
        },
      });
      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idmonumento));
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

  async getMonumentoById(req, res) {
    const idmonumento = req.params.idmonumento;
    try {
      const fila = await Monumento.findByPk(idmonumento);
      if (fila) {
        res.json(Respuesta.exito(fila, "Monumento recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Monumento no encontrado"));
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

  async updateMonumento(req, res) {
    const monumento = req.body;
    const idmonumento = req.params.idmonumento;

    if (idmonumento != monumento.idmonumento) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id del monumento no coincide"));
    }

    try {
      const numFilas = await Monumento.update({ ...monumento }, { where: { idmonumento } });

      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + idmonumento));
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

module.exports = new MonumentoController();
