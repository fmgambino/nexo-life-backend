
import CommentStatus from "../models/commentStatusModel.js";

const createDefaultCommentStatus = async () => {
  try {
    const existingCommentStatus = await CommentStatus.find();

    if (existingCommentStatus.length === 0) {
      const defaultCommentStatus = [
        { status: "Visitado", color: "#00ff00" },
        { status: "Contacto teléfonico", color: "#FFA500" },
        { status: "No informo", color: "#FF7700" },
        { status: "No consolidado", color: "#FF0000" },
        { status: "No recibió", color: "#0000ff" },
      ];

      await CommentStatus.insertMany(defaultCommentStatus);
      console.log("Filas por defecto creadas correctamente.");
    }
  } catch (error) {
    console.error("Error al crear las filas por defecto:", error);
  }
};

const getAllCommentStatus = async (req, res, next) => {
  try {
    const commentStatus = await CommentStatus.find();
    res.status(200).json({status: true, data:commentStatus});
  } catch (error) {
    next(createError(500, error.message));
  }
};

export default {
  createDefaultCommentStatus,
  getAllCommentStatus
};
