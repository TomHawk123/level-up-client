import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
  const history = useHistory()
  const [gameTypes, setGameTypes] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0
  })

  useEffect(() => {
    getGameTypes(setGameTypes)
  }, [])

  const changeGameState = (e) => {
    // TODO: Complete the onChange function
    const newGame = Object.assign({}, currentGame)
    newGame[e.target.name] = e.target.value
    setCurrentGame(newGame)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level:</label>
          <input type="number" name="skillLevel" required autoFocus className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players:</label>
          <input type="number" name="numberOfPlayers" required autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker:</label>
          <input type="text" name="maker" required autoFocus className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type Id:</label>
          <input type="number" name="gameTypeId" required autoFocus className="form-control"
            value={currentGame.gameTypeId}
            onChange={changeGameState}
          />
        </div>
      </fieldset>


      {/* TODO: create the rest of the input fields */}

      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            gameTypeId: parseInt(currentGame.gameTypeId)
          }

          // Send POST request to your API
          createGame(game)
            .then(() => history.push("/games"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}