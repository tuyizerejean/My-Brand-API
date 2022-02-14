import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

if (mode === "development") {
    mongoose.connect(process.env.DEVELOPMENT_DB, {
    useNewUrlParser: true,
  });
} else if (mode === "test") {
    mongoose.connect(process.env.TEST_DB, { useNewUrlParser: true });
} else if (mode === "production") {
    mongoose.connect(process.env.PRODUCTION_DB, {
    useNewUrlParser: true,
  });
}
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/api/v1/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
export default app;
