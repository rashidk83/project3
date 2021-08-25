import React from "react";
import Card from "./Card";
import { useGameContext } from "../../context/GameContext"

function DraggableCard({index, card, location}) {
  const {
    gameState, setGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  const handleDraggedCard = (e) => {
    setDraggedCard({ 
      index: e.target.getAttribute("value"),
      location: e.target.getAttribute("location")
   })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.getAttribute("location"))
    const draggedCardLocationArr = draggedCard.location.split(".") 
    let draggedCardSchema = playerState
    draggedCardLocationArr.forEach(ref => {
      draggedCardSchema = draggedCardSchema[ref]
    })
    console.log(draggedCardSchema)
    const movedCard = draggedCardSchema.splice(draggedCard.index, 1)[0]

    const newIndex = e.currentTarget.getAttribute("value")
    const newLocation = e.currentTarget.getAttribute("location")
    let newLocationArr = newLocation.split(".") 
    let newLocationSchema = playerState
    newLocationArr.forEach(ref => {
      newLocationSchema = newLocationSchema[ref]
    })

    newLocationSchema.splice(newIndex, 0, movedCard)

    setPlayerState({ ...playerState })
    setDraggedCard({ 
      index: newIndex,
      location: newLocation
    })
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
      location = {location}
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