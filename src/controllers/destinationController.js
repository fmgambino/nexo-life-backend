
import Destination from "../models/destinationModel.js";

const createDefaultDestinations = async () => {
  try {
    const existingDestinations = await Destination.find();

    if (existingDestinations.length === 0) {
      const defaultDestinations = [
        { destination: "Consolidado", color: "#008000" },
        { destination: "En oración/baa", color: "#FF0000" },
        { destination: "Otra iglesia", color: "#0000FF" },
        { destination: "Visita", color: "#FFA500" },
        { destination: "En proceso", color: "#808080" },
      ];

      await Destination.insertMany(defaultDestinations);
      console.log("Filas por defecto creadas correctamente.");
    }
  } catch (error) {
    console.error("Error al crear las filas por defecto:", error);
  }
};

const getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({status: true, data:destinations});
  } catch (error) {
    next(createError(500, error.message));
  }
};

export default {
  createDefaultDestinations,
  getAllDestinations
};
