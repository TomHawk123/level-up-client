import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createEvent, getGamers, updateEvent, getEventById } from './EventManager.js'

export const EventForm = () => {
  const history = useHistory()
  const [gamers, setGamers] = useState([])
  const { eventId } = useParams()
  const [currentEvent, setCurrentEvent] = useState({})

  useEffect(
    () => {
      getGamers(setGamers)
    }, [])

  const editMode = eventId ? true : false

  useEffect(
    () => {
      if (editMode) {
        getEventById(eventId)
          .then(
            r => {
              r.game = r.game.id
              r.organizer = r.organizer.id
              setCurrentEvent(r)
            })
      }
    },
    []
  )

  const changeEventState = e => {
    // TODO: Complete the onChange function
    const newEvent = Object.assign({}, currentEvent)
    newEvent[e.target.name] = e.target.value
    setCurrentEvent(newEvent)
  }

  const constructNewEvent = () => {

    if (editMode) {
      updateEvent({
        id: parseInt(currentEvent.id),
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: parseInt(currentEvent.organizer)
      })
    } else {
      createEvent({
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: parseInt(currentEvent.organizer)
      })
    }
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">
        {editMode ? "Edit Event" : "Register New Event"}
      </h2>
      <fieldset id="game">
        <div className="form-group">
          <label htmlFor="gameId">Game Id:</label>
          <input type="number" name="game" required autoFocus
            className="form-control"
            value={`${currentEvent.game}`}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset id="description">
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <input type="text" name="description" required autoFocus
            className="form-control"
            placeholder="Description of event"
            value={`${currentEvent.description}`}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset id="date">
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input type="date" name="date" required autoFocus
            placeholder="YYYY-MM-DD"
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset id="time">
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input type="text" name="time" required autoFocus
            className="form-control"
            placeholder="HH:MM"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset id="organizer">
        <div className="form-group">
          <label htmlFor="organizerId">Organizer Id:</label>
          <input type="number" name="organizer" required autoFocus
            className="form-control"
            value={`${currentEvent.organizer}`}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={e => {
          // Prevent form from being submitted
          e.preventDefault()
          constructNewEvent()
          history.push("/events")
        }}
        className="btn btn-primary">{editMode ? "Edit Event" : "Create Event"}
      </button>
    </form>
  )
}