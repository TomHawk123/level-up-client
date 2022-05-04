import React from "react"
import "./Games.css"
import { Link } from "react-router-dom"

export default ({ game }) => (
    <section className="game">
        <h3 className="game__name">
            <Link to={`/games/${game.id}`}>
                {game.name}
            </Link>
        </h3>
        <div className="game__breed">{game.breed}</div>
    </section>
)