import { envs } from "./config/index.js";
import { Server } from "./server.js";

const port = envs.PORT;
(() => main())();

async function main() {
  const server = new Server(port);
  await server.start();
}
