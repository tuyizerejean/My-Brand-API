import {
  createQuery,
  getAllQueries,
  getOneQuery,
  deleteQuery,
} from "../services/queryServices.js";

export class QueryControllers {
  async sendQuery(req, res, next) {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        location: req.body.location,
      };
      const query = await createQuery(data);
      res.status(201).json({
        status: 201,
        message: "Your querry is sent successfully",
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async getAllQuery(req, res, next) {
    try {
      const queries = await getAllQueries();
      res.status(200).json({
        status: 200,
        message: "Your querry is sent successfully",
        data: queries,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async getOneQuery(req, res, next) {
    try {
      const query = await getOneQuery(req.params.id);
      if (typeof query !== "string") {
        res.status(200).json({
          status: 200,
          message: "Query retrieved successfully",
          data: query,
        });
      } else {
        res.status(404).json({ status: 500, message: query });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async deleteQuery(req, res, next) {
    try {
      const result = await deleteQuery(req.params.id);
      res.status(200).json({ status: 200, message: result });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
}
