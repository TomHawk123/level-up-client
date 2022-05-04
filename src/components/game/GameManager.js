import { fetchIt } from "../utils/Fetch"

const API = "http://localhost:8000"

export const getGames = () => fetchIt(`${API}/games`)

export const createGame = game => fetchIt(`${API}/games`, "POST", game)

export const getGameTypes = () => fetchIt(`${API}/gametypes`)

export const updateGame = game => fetchIt(`${API}/games/${game.id}`, "PUT", game)

export const getGameById = game => fetchIt(`${API}/games/${game}`)