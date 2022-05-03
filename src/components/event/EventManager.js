import { fetchIt } from "../utils/Fetch"

export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const createEvent = (newEvent) => fetchIt(`${API}/events`)

export const getGamers = () => fetchIt(`${API}/gamers`)