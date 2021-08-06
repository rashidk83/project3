import React, { useState } from "react";
import { useGameContext } from "../../context/GameContext"

import Card from "./Card"



function PlayerHand() {
  const { playerState, setPlayerState, gameState } = useGameContext()
  const [draggedCard, setDraggedCard] = useState({ index: null })

  const handleDraggedCard = (e) => {
    setDraggedCard({ index: e.target.getAttribute("value")})
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const movedCard = playerState.hand.splice(draggedCard.index, 1)[0]
    let newIndex = e.target.getAttribute("value")
    if (draggedCard.index < newIndex) {
      newIndex --
    }
    playerState.hand.splice(newIndex, 0, movedCard)
    console.log({...playerState})
    setPlayerState({...playerState})
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // const handleDragEnter = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  // const handleDragLeave = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  return (
    <div className={playerState.hand.length == 11 ? "hand eleven-cards" : playerState.hand.length == 10 ? "hand ten-cards" : ""}>
      {playerState.hand.map((card, index) => (
        <div className="card-holder"
          key={index}
          value={index}
          draggable={true}
          onDragStart={e => handleDraggedCard(e)}
          onDragOver={handleDragOver}
        >
          <Card
            index={index}
            card={card}
          />
                    <div 
            className="drop-zone"
            value={index}
            // onDragEnter={e => handleDragEnter(e)}
            // onDragLeave={e => handleDragLeave(e)}
          >
            <div className="drop-zone-left"
              value={index}
              onDrop={handleDrop}
            ></div>
            <div className="drop-zone-right"
              value={index + 1}
              onDrop={handleDrop}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlayerHand
