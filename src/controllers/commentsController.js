import {
  createComment,
  getArticleComments,
} from "../services/commentServices.js";

export class CommentControllers {
  async addComment(req, res, next) {
    try {
      const data = {
        articleId: req.params.articleid,
        name: req.body.name,
        comment: req.body.comment,
      };
      const comment = await createComment(data);
      return res
        .status(201)
        .json({ message: "the comment is added", comment: comment });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
  async getComments(req, res, next) {
    try {
      const comments = await getArticleComments(req.params.articleid);
      return res.status(200).json({
        message: "Comments retrieved successfully",
        comments: comments,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Sorry we are experiencing server error",
      });
    }
  }
}
