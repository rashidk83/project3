import React from "react";
import { useGameContext } from "../../context/GameContext"

function CardContainer({children, width, location}) {
  const {
    gameState, setGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    // if the dragged card location and the current location are the same no change is needed
    if (e.currentTarget.getAttribute("location") === draggedCard.location) return

    //remove dragged card based on ref and index
    console.log(e.currentTarget.getAttribute("location"))
    const draggedCardLocationArr = draggedCard.location.split(".") 
    let draggedCardSchema = playerState
    draggedCardLocationArr.forEach(ref => {
      draggedCardSchema = draggedCardSchema[ref]
    })
    console.log(draggedCardSchema)
    const movedCard = draggedCardSchema.splice(draggedCard.index, 1)[0]

    //place card in target location
    const newLocation = e.currentTarget.getAttribute("location")
    let newLocationArr = newLocation.split(".") 
    let newLocationSchema = playerState
    newLocationArr.forEach(ref => {
      newLocationSchema = newLocationSchema[ref]
    })
    newLocationSchema.push(movedCard)

    //set state, and dragged card to reference its new spot 
    setPlayerState({...playerState})
    setDraggedCard({ 
      index: newLocationSchema.length - 1,
      location: newLocation
    })
  }

   //DISPLAY

  const style = {
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "10px auto",
      border: "solid 1px black",
      backgroundColor: `rgb(245, 245, 255)`,
      width: width
    },
  }

  return (
    <div 
      style={style.cardContainer}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      location={location}
    >
      {children}
    </div>
  )
}

export default CardContainer
