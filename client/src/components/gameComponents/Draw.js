import React from "react";
import { useGameContext } from "../../context/GameContext"

import Deck from "./Deck"
import DiscardPile from "./DiscardPile"
import GoOut from "./GoOut"

function Draw() {
  const { gameState, playerState, setPlayerState } = useGameContext()

  //DISPLAY

  const style = {
    draw: {
      margin: "10px"
    },
    decks: {
      margin: "10px",
      display: "flex",
      justifyContent: "center"
    }
  }

  return (
    <div style={style.draw}>
      {gameState.action === `player-${playerState.number}-turn` ? (
        <div>
          {playerState.hand.length === 11 ? (
            <h2>Please Discard</h2>
          ) : (
            <h2>Please Draw</h2>
          )}
        </div>
      ) : (
       <div></div>   
      )}
      <div style={style.decks}>
        <Deck />
        <DiscardPile />
      </div>
      <GoOut />
    </div>
  )
}

export default Draw
