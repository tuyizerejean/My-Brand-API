import { uploadFile } from "../helpers/fileUpload.js";
import { generateToken } from "../helpers/jwtFunctions.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity.js";
import { userExist, createUser } from "../services/userServices.js";

export class UserControllers {
  async register(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        return res.status(409).json({
          status: 409,
          message: "User with this email already exist. use different one",
        });
      } else {
        if (req.file) {
          req.body.picture = await uploadFile(req);
        } else {
          req.body.picture =
            "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";
        }
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: await hashPassword(req.body.password),
          picture: req.body.picture,
        };
        const createdUser = await createUser(user);
        return res.status(201).json({
          status: 201,
          message: "user registered successfully",
          user: createdUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async login(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          return res
            .status(403)
            .json({ status: 403, message: "Invalid credentials" });
        }
        const token = await generateToken({ id: exist._id });
        return res.status(200).json({
          status: 200,
          message: "Logged in successfully",
          accessToken: token,
        });
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
}
