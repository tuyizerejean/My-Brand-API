import express from "express";
import multer from "multer";
import { UserControllers } from "../../controllers/userController.js";
import { fileFilter } from "../../helpers/fileFilter.js";
const route = express.Router();
const storage = multer.diskStorage({});

const uploads = multer({ storage, fileFilter });
const userControllers = new UserControllers();
route.post("/register", uploads.single("picture"), userControllers.register);
route.post("/login", userControllers.login);

export default route;
