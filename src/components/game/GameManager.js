import { fetchIt } from "../utils/Fetch"

const API = "http://localhost:8000"

export const getGames = () => {
  return fetch(`${API}/games`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const createGame = (game) => {
  return fetchIt(`${API}/games`, "POST", JSON.stringify(game))
}

export const getGameTypes = () => {
  return fetchIt(`${API}/gametypes`)
}