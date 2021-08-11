import React from "react";
import { useGameContext } from "../../context/GameContext"

import Card from "./Card"

function Deck() {
  const { gameState, playerState, setPlayerState } = useGameContext()

  const drawFromDeck = () => {
    let randomNumber = (Math.floor(Math.random() * gameState.deck.length))
    let drawnCard = gameState.deck.splice(randomNumber, 1)[0]
    playerState.hand.push(drawnCard)
    setPlayerState({ ...playerState })
  }

  // DISPLAY
  const style = {
    deck: {
      margin: "10px"
    }
  }

  return (
    <div style={style.deck}>
      {gameState.action === `player-${playerState.number}-turn` && playerState.hand.length === 10 ? (
        <div 
          style={{ cursor: "pointer" }}
          onClick={drawFromDeck}
        >
          <Card
            display="Deck"
            suit=""
          />
        </div>
      ) : (
        <Card
          display="Deck"
          suit=""
        />
      )}
    </div>
  )
}

export default Deck
