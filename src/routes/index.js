import express from "express";
import welcomeRoutes from "./api/welcomeRoutes.js";
import articleRoutes from "./api/articleRoutes.js";
import commentRoutes from "./api/commentRoutes.js";
import queriesRoutes from "./api/queriesRoutes.js";

const routes = express.Router();

routes.use("/", welcomeRoutes);
routes.use("/aritcles", articleRoutes);
routes.use("/comments", commentRoutes);
routes.use("/queries", queriesRoutes);

export default routes;
