import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes, updateGame, getGameById } from './GameManager.js'

export const GameForm = () => {
  const [gameTypes, setGameTypes] = useState([])
  const history = useHistory()
  const { gameId } = useParams()
  const [currentGame, setCurrentGame] = useState({})

  useEffect(
    () => {
      getGameTypes(setGameTypes)
    },
    [])

  const editMode = gameId ? true : false

  useEffect(
    () => {
      if (editMode) {
        getGameById(gameId).then(res => {
          res.game_type = res.game_type.id
          setCurrentGame(res)
        })
      }
      getGameTypes(setGameTypes)
    },
    [])

  const changeGameState = e => {
    const newGame = Object.assign({}, currentGame)
    newGame[e.target.name] = e.target.value
    setCurrentGame(newGame)
  }

  const constructNewGame = () => {
    const gameTypeId = parseInt(currentGame.gameTypeId)

    if (editMode) {
      updateGame({
        id: currentGame.id,
        game_type: parseInt(currentGame.game_type),
        title: currentGame.title,
        maker: currentGame.maker,
        number_of_players: parseInt(currentGame.number_of_players),
        skill_level: parseInt(currentGame.skill_level)
      })
        .then(() => history.push("/games"))
    } else {
      createGame({
        game_type: parseInt(currentGame.game_type),
        title: currentGame.title,
        maker: currentGame.maker,
        number_of_players: parseInt(currentGame.number_of_players),
        skill_level: parseInt(currentGame.skill_level)
      })
        .then(() => history.push("/games"))
    }
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">{editMode ? "Update Game" : "Register New Game"}</h2>
      <fieldset id="skill_level">
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level:</label>
          <input type="number" name="skill_level" required autoFocus className="form-control"
            value={`${currentGame.skill_level}`}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset id="numberOfPlayers">
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players:</label>
          <input type="number" name="number_of_players" required autoFocus
            className="form-control"
            value={`${currentGame.number_of_players}`}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset id="title">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset id="maker">
        <div className="form-group">
          <label htmlFor="maker">Maker:</label>
          <input type="text" name="maker" required autoFocus className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset id="gameTypeId">
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type Id:</label>
          <input type="number" name="game_type" required autoFocus className="form-control"
            value={`${currentGame.game_type}`}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={e => {
          e.preventDefault()
          constructNewGame()
        }}
        className="btn btn-primary">{editMode ? "Update Game" : "Create Game"}</button>
    </form>
  )
}