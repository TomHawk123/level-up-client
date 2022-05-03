import { fetchIt } from "../utils/Fetch"

const API = "http://localhost:8000"

export const getGames = () => fetchIt(`${API}/games`)

export const createGame = (game) => {
  return fetchIt(`${API}/games`, "POST", game)
}

export const getGameTypes = () => {
  return fetchIt(`${API}/gametypes`)
}