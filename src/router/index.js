import { Router } from "express";
import { cacheData } from "../middlewares/cacheData.js";
import { AppController } from "../controller/index.js";

export class AppRouter {
  static get routes() {
    const router = Router();

    router.get("/characters/:id", cacheData, AppController.getById);
    router.get("/characters", cacheData, AppController.getAll);

    return router;
  }
}
