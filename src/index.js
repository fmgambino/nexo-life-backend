import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
import dbConnect from "./config/dbConnect.js";

import swaggerDocs from "./routes/swagger.js";
import authRoutesV1 from "./routes/v1/authRoutes.js";
import churchRoutesV1 from "./routes/v1/churchRoutes.js";
import consolidationRoutesV1 from "./routes/v1/consolidationRoutes.js";
import evangelizationRoutesV1 from "./routes/v1/evangelizeRoutes.js";
import commentRoutesV1 from "./routes/v1/commentRoutes.js";

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: `Hello server running!`,
//   });
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v1/church", churchRoutesV1);
app.use("/api/v1/consolidation", consolidationRoutesV1);
app.use("/api/v1/consolidation", consolidationRoutesV1);
app.use("/api/v1/evangelization", evangelizationRoutesV1);
app.use("/api/v1/comment", commentRoutesV1);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo salió mal!";
  return res.status(errorStatus).json({
    status: false,
    //status: errorStatus,
    message: errorMessage,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  swaggerDocs.swaggerDocs(app, PORT);
});
