import React from "react";
import { useGameContext } from "../../context/GameContext"

import DraggableCard from "./DraggableCard"
import Card from "./Card"

function Sets() {
  const {
    gameState, setGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e, setIndex) => {
    const movedCard = playerState.hand.splice(draggedCard.index, 1)[0]

    playerState.sets[setIndex].push(movedCard)

    setPlayerState({...playerState})
  }

  // DISPLAY
  const style = {
    setsContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "10px auto",
      border: "solid 1px black",
      backgroundColor: `rgb(245, 245, 255)`,
    },
    setContainer: {
      margin: "10px auto",
      border: "solid 1px black",
    },
    set: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "10px auto",
      padding: "10px",
    }
  }

  return (
    <div>
      {gameState.action === playerState.number && playerState.action === "declareSets" ? (
        <div style={style.setsContainer}>

          <div 
            style={style.setContainer}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 0)}
          >
            <h6>Set 1</h6>
            <div style={style.set}>
              {playerState.sets[0].length ? (
                <>
                  {playerState.sets[0].map((card, index) => (
                  <DraggableCard
                    index={index}
                    card={card}
                    location={"sets.0"}
                  />
                  ))}
                </>
              ) : (
                <Card display="Add Here" suit="" />
              )}
            </div>
          </div>

          <div 
            style={style.setContainer}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 1)}
          >
            <h6>Set 2</h6>
            <div style={style.set}>
              {playerState.sets[1].length ? (
                <>
                  {playerState.sets[1].map((card, index) => (
                  <DraggableCard
                    index={index}
                    card={card}
                    location={"sets.1"}
                  />
                  ))}
                </>
              ) : (
                <Card display="Add Here" suit="" />
              )}
            </div>
          </div>

          <div 
            style={style.setContainer}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 2)}
          >
            <h6>Set 3</h6>
            <div style={style.set}>
              {playerState.sets[2].length ? (
                <>
                  {playerState.sets[2].map((card, index) => (
                  <DraggableCard
                    index={index}
                    card={card}
                    location={"sets.2"}
                  />
                  ))}
                </>
              ) : (
                <Card display="Add Here" suit="" />
              )}
            </div>
          </div>

          <div 
            style={style.setContainer}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 3)}
          >
            <h6>Unmatched</h6>
            <div style={style.set}>
              {playerState.sets[3].length ? (
                <>
                  {playerState.sets[3].map((card, index) => (
                  <DraggableCard
                    index={index}
                    card={card}
                    location={"sets.3"}
                  />
                  ))}
                </>
              ) : (
                <Card display="Add Here" suit="" />
              )}
            </div>
          </div>
          
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Sets
