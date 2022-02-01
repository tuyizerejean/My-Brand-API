import express from "express";
import { CommentControllers } from "../../controllers/commentsController.js";

const route = express.Router();
const commentsController = new CommentControllers();
route.post("/:articleid", commentsController.addComment);
route.get("/:articleid", commentsController.getComments);

export default route;
