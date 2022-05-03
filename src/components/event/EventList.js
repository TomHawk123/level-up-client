import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents().then(data => setEvents(data))
  }, [])

  return (
    <>
      <article className="events">
        {
          events.map(event => {
            return <section key={`event--${event.id}`} className="event">
              <div className="event__game">{event.game.title} Skill Level: {event.game.skill_level}</div>
              <div className="event__description">{event.description}</div>
              <div className="date">{event.date}</div>
              <div className="event__time">{event.time}</div>
            </section>
          })
        }
      </article>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push("/events/new")
        }}
      >
        Register New Event
      </button>
    </>
  )
}