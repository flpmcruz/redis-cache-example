import { createClient } from "redis";
import { envs } from "../config/index.js";

export const redisClient = await createClient({ url: envs.REDIS_URI })
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()
