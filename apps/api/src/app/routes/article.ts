import { verifyToken } from "../middleware/auth"; 
import * as article from "../controllers/article";
import { Express } from 'express';

export function addArticleRoutes(app: Express) {
  app.post("/article", verifyToken, article.addArticle);
  app.get("/articles/:id", article.getArticle);
  app.delete('/articles/:id', verifyToken, article.deleteArticle);
}
