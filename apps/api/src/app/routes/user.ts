import * as user from "../controllers/user";
import { Express } from 'express';

export function addUserRoutes(router: Express) {
  // register a new user
  router.post("/register", user.register);
  router.post("/login",  user.login);
  router.get("/welcome",  user.welcome);
}