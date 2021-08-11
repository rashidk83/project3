import React from "react";
import Card from "./Card";
import { useGameContext } from "../../context/GameContext"

function DraggableCard({index, card}) {
  const {
    gameState, setGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  const handleDraggedCard = (e) => {
    setDraggedCard({ index: e.target.getAttribute("value") })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.getAttribute("value"))
    const movedCard = playerState.hand.splice(draggedCard.index, 1)[0]
    let newIndex = e.currentTarget.getAttribute("value")
    playerState.hand.splice(newIndex, 0, movedCard)
    console.log({ ...playerState })
    setPlayerState({ ...playerState })
    setDraggedCard({ index: newIndex})
  }

  //DISPLAY
  const style = {
    draggableCard: {
      cursor: "move",
    }
  }

  return (
    <div
      style={style.draggableCard}
      value = {index}
      draggable={true}
      onDragStart={handleDraggedCard}
      onDragOver={handleDragOver} 
      onDragEnter={handleDragEnter}
    > 
      <Card {...card}/>
    </div>
  )
}

export default DraggableCard