import express from "express";
import { AppRouter } from "./router/index.js";

export class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
  }

  async start() {
    this.app.use("/hogwarts", AppRouter.routes);

    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}
