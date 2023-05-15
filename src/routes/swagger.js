import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
const swaggerJSDoc = YAML.load("./openapi.yaml");

const swaggerDocs = (app, port) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
  console.log(`Version 1 Docs are available on http://localhost:${port}/`);
};

export default { swaggerDocs };
