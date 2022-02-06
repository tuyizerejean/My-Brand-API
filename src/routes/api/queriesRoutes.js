import express from "express";
import { QueryControllers } from "../../controllers/queriesController.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { queryValidation } from "../../validations/queryValidation/query.validation.js";

const route = express.Router();

const queryControllers = new QueryControllers();

route.post("/", queryValidation, queryControllers.sendQuery);
route.get("/", authenticate, queryControllers.getAllQuery);
route.get("/:id", authenticate, queryControllers.getOneQuery);
route.delete("/:id", authenticate, queryControllers.deleteQuery);

export default route;
