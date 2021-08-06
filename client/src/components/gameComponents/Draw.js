import React from "react";
import { useGameContext } from "../../context/GameContext"
import Card from "./Card"

function Draw() {
  const { gameState, playerState, setPlayerState } = useGameContext()
  console.log(gameState.discard)

  const drawFromDeck = () => {
    let randomNumber = (Math.floor(Math.random() * gameState.deck.length))
    let drawnCard = gameState.deck.splice(randomNumber, 1)[0]
    playerState.hand.push(drawnCard)
    setPlayerState({...playerState})
  }

  return (
    <div className="draw">
      {gameState.discard.length ? (
        <div className="discard-display">
          <Card {...gameState.discard[0]} />
        </div>
      ) : (
        <></>
      )}
      {gameState.action === `player-${playerState.number}-turn` ? (
        <button onClick={drawFromDeck}>
          Draw From Deck
        </button>
      ) : (
        <></>
      )}
      
    </div>
  )
}

export default Draw
