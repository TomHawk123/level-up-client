import { fetchIt } from "../utils/Fetch"


const API = `http://localhost:8000`

export const getEvents = () => {
  return fetch(`${API}/events`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const createEvent = (newEvent) => fetchIt(`${API}/events`, "POST", newEvent)

export const getGamers = () => fetchIt(`${API}/events`)