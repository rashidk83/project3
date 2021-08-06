import React from "react";
import { useGameContext } from "../../context/GameContext"
import Card from "./Card"

function Draw() {
  const { gameState, playerState, setPlayerState } = useGameContext()
  console.log(playerState)

  const drawFromDeck = () => {
    let randomNumber = (Math.floor(Math.random() * gameState.deck.length))
    let drawnCard = gameState.deck.splice(randomNumber, 1)[0]
    playerState.hand.push(drawnCard)
    playerState.mustDiscard = true
    setPlayerState({ ...playerState })
  }

  return (
    <div className="draw">
      {gameState.action === `player-${playerState.number}-turn` && playerState.mustDiscard === false ? (
        <div>
          <h2>Please Draw</h2>
          <div>
            <button className="deck" onClick={drawFromDeck}>
              Draw From Deck
            </button>
            {gameState.discard.length ? (
              <div draggable="true">
                <Card
                  index={0}
                  card={gameState.discard[0]}
                />
              </div>
            ) : (
              <div>
                <Card
                  index={null}
                  card={{ display: "Discard Empty", suit: "" }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="deck" onClick={drawFromDeck}>
              <p>Deck</p>
            </div>
            {gameState.discard.length ? (
              <div className="discard-display">
                <Card
                  index={0}
                  card={gameState.discard[0]}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}


    </div>
  )
}

export default Draw
