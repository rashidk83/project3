import React from "react";
import { useGameContext } from "../../context/GameContext"
import Card from "./Card"

function DiscardPile() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    const movedCard = playerState.hand.splice(draggedCard.index, 1)[0]
    gameState.discard.unshift(movedCard)
    if (playerState.number === "1") {
      gameState.action = "player-2-turn"
    } else {
      gameState.action = "player-1-turn"
    }
    
    updateGameState({...gameState})
    setPlayerState({...playerState})
    setDraggedCard({ index: null })
  }

  const handleDraw = () => {
    const movedCard = gameState.discard.splice(0,1)[0]
    playerState.hand.push(movedCard)

    updateGameState({...gameState})
    setPlayerState({...playerState})
  }

  //DISPLAY 

  const Stuff = ({children}) => {
    //If player's turn
    if (gameState.action === `player-${playerState.number}-turn`) {
      //If 10 card's in Hand and discard not empty
      if(playerState.hand.length === 10 && gameState.discard.length !== 0) {
        return (
          <div 
            style={{cursor: "pointer"}}
            onClick={handleDraw}
          > 
            {children} 
          </div>
        )
      }
      if(playerState.hand.length === 11) {
        return (
          <div 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
          > 
            {children} 
          </div>
        )
      }
    }
    
    return (
      <div> 
        {children} 
      </div>
    )
    
  }

  const style = {
    discardPile: {
      margin: "10px"
    }
  }

  return (
    <div style={style.discardPile}>
      <Stuff>
        {gameState.discard.length ? (
          <div>
            <Card
              {...gameState.discard[0]}
            />
          </div>
        ) : (
          <Card
            display="Discard Empty"S
            suit=""
          />
        )}
      </Stuff>
    </div>
  )
}

export default DiscardPile
