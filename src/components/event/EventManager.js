import { fetchIt } from "../utils/Fetch"

const API = `http://localhost:8000`

export const getEvents = () => fetchIt(`${API}/events`)

export const createEvent = (newEvent) => fetchIt(`${API}/events`, "POST", newEvent)

export const getGamers = () => fetchIt(`${API}/events`)

export const getEventById = event => fetchIt(`${API}/events/${event}`)

export const updateEvent = event => fetchIt(`${API}/events/${event.id}`, "PUT", event)