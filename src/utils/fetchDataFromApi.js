import axios from "axios";
import { envs } from "../config/index.js";

export async function fetchDataFromApi(characterId) {
  let apiUrl = envs.API_URL;
  if (characterId) apiUrl = `${apiUrl}/character/${characterId}`;
  else apiUrl = `${apiUrl}/characters`;

  const { data } = await axios.get(apiUrl);
  return data;
}
