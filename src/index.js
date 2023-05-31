import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';

import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
import dbConnect from "./config/dbConnect.js";

import authRoutesV1 from "./routes/v1/authRoutes.js";
import churchRoutesV1 from "./routes/v1/churchRoutes.js";
import consolidationRoutesV1 from "./routes/v1/consolidationRoutes.js";
import evangelizationRoutesV1 from "./routes/v1/evangelizeRoutes.js";
import commentRoutesV1 from "./routes/v1/commentRoutes.js";
import destinationRoutesV1 from "./routes/v1/destinationRoutes.js";
import commentStatusRoutesV1 from "./routes/v1/commentStatusRoutes.js";
import leaderRoutesV1 from "./routes/v1/leaderRoutes.js";
import discipleRoutesV1 from "./routes/v1/discipleRoutes.js";


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const openApiPath = `${__dirname}/openapi.yaml`;
const openApiDoc = YAML.load(openApiPath);

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;



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
app.use("/api/v1/leader", leaderRoutesV1);
app.use("/api/v1/disciple", discipleRoutesV1);
app.use("/api/v1/destination", destinationRoutesV1);
app.use("/api/v1/comment-status", commentStatusRoutesV1);
app.use("/api/v1/evangelization", evangelizationRoutesV1);
app.use("/api/v1/comment", commentRoutesV1);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo salió mal!";
  return res.status(errorStatus).json({
    status: false,
    message: errorMessage,
  });
});

const swaggerOptions = {
  definition: openApiDoc,

  apis: [`${__dirname}/routes/v1/*.js`],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app, port) => {
  // Ruta para acceder a la documentación de Swagger
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`);
}



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  // swaggerDocs.swaggerDocs(app, PORT);
  swaggerDocs(app,  PORT);
});
