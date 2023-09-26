import express from "express";
import { fetchDataFromApi } from "./fetchDataFromApi.js";
import { cacheData } from "./cacheData.js";
import { redisClient } from "./redisClient.js";

const app = express();
const port = process.env.PORT || 3000;

// fetch character by id
app.get("/hogwarts/characters/:id", cacheData, async (req, res) => {
  try {
    const redisKey = `hogwarts-character-${req.params.id}`;
    let results = await fetchDataFromApi(req.params.id);
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
});

// fetch all characters
app.get("/hogwarts/characters", cacheData, async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
