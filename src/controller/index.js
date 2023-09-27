import { redisClient } from "../cache/redisClient.js";
import { fetchDataFromApi } from "../utils/fetchDataFromApi.js";

export class AppController {
  static async getAll(req, res) {
    try {
      const redisKey = "hogwarts-characters";
      let results = await fetchDataFromApi();
      if (!results.length) {
        throw new Error("Data unavailable");
      }
      await redisClient.set(redisKey, JSON.stringify(results), {
        EX: 120,
        NX: true,
      });

      return res.status(200).send({
        fromCache: false,
        data: results,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send("Data unavailable");
    }
  }

  static async getById(req, res) {
    try {
      const redisKey = `hogwarts-character-${req.params.id}`;
      let results = await fetchDataFromApi(req.params.id);
      if (!results.length) throw new Error("Data unavailable");

      await redisClient.set(redisKey, JSON.stringify(results), {
        EX: 120,
        NX: true,
      });

      return res.status(200).send({
        fromCache: false,
        data: results,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send("Data unavailable");
    }
  }
}
