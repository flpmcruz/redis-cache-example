import axios from "axios";

export async function fetchDataFromApi(characterId) {
  let apiUrl = "https://hp-api.onrender.com/api";
  if (characterId) {
    apiUrl = `${apiUrl}/character/${characterId}`;
  } else {
    apiUrl = `${apiUrl}/characters`;
  }
  const apiResponse = await axios.get(apiUrl);
  return apiResponse.data;
}
