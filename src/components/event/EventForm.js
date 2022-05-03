import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getGamers } from './EventManager.js'


export const EventForm = () => {
  const history = useHistory()
  const [gamers, setGamers] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({
    gameId: 1,
    description: "",
    date: "",
    time: "",
    organizerId: 0
  })

  useEffect(() => {
    getGamers(setGamers)
  }, [])

  const changeEventState = (e) => {
    // TODO: Complete the onChange function
    const newEvent = Object.assign({}, currentEvent)
    newEvent[e.target.name] = e.target.value
    setCurrentEvent(newEvent)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game Id:</label>
          <input type="number" name="gameId" required autoFocus
            className="form-control"
            value={`${currentEvent.gameId}`}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
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
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input type="text" name="date" required autoFocus
            placeholder="YYYY-MM-DD"
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
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
      <fieldset>
        <div className="form-group">
          <label htmlFor="organizerId">Organizer Id:</label>
          <input type="number" name="organizerId" required autoFocus
            className="form-control"
            value={`${currentEvent.organizerId}`}
            onChange={changeEventState}
          />
        </div>
      </fieldset>


      {/* TODO: create the rest of the input fields */}

      <button type="submit"
        onClick={e => {
          // Prevent form from being submitted
          e.preventDefault()

          const event = {
            game: currentEvent.gameId,
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            organizer: currentEvent.organizerId
          }

          // Send POST request to your API
          createEvent(event)
            .then(() => history.push("/events"))
        }}
        className="btn btn-primary">Create Event</button>
    </form>
  )
}