import express from "express";
import { QueryControllers } from "../../controllers/queriesController.js";

const route = express.Router();

const queryControllers = new QueryControllers();

route.post("/", queryControllers.sendQuery);
route.get("/", queryControllers.getAllQuery);
route.get("/:id", queryControllers.getOneQuery);
route.delete("/:id", queryControllers.deleteQuery);

export default route;
