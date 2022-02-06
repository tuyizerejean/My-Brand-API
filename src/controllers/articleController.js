import {
  createArticleService,
  deleteArticle,
  getAllArticlesService,
  getOneArticleService,
  updateArticle,
} from "../services/articleServices.js";
import { uploadFile } from "../helpers/fileUpload.js";
export class ArticleController {
  async createArticle(req, res, next) {
    try {
      req.body.image = await uploadFile(req);
      const data = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        create_at: new Date(),
      };
      const article = await createArticleService(data);
      return res.status(200).json({
        status: 200,
        message: "Article created successfully",
        data: article,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }

  async getAllArticles(req, res, next) {
    try {
      const articles = await getAllArticlesService();
      return res.status(200).json({
        status: 200,
        message: "These are all the articles",
        data: articles,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async getArticle(req, res, next) {
    try {
      const article = await getOneArticleService(req.params.id);
      if (typeof article !== "string") {
        return res.status(200).json({
          status: 200,
          message: "article retrieved successfully",
          data: article,
        });
      } else {
        return res.status(404).json({ status: 500, message: article });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }

  async updateArticle(req, res, next) {
    try {
      if (req.file) {
        req.body.image = await uploadFile(req);
      }
      const article = await updateArticle(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: "article updated successfully",
        data: article,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }

  async deleteArticle(req, res, next) {
    try {
      const result = await deleteArticle(req.params.id);
      return res.status(200).json({ status: 200, message: result });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
}
