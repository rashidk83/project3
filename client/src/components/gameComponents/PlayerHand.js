import React from "react";
import { useMediaQuery } from "react-responsive"
import { useGameContext } from "../../context/GameContext"

import Card from "./Card"
import DraggableCard from "./DraggableCard"

function PlayerHand() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  //DISPLAY

  const mediaQuery = useMediaQuery({ query: '(max-width: 1022px)' })

  const determineWidth = () => {
    if (playerState.hand.length === 11) {
      if (mediaQuery) {
        return "582px"
      }
      return "1012px"
    }
    if (playerState.hand.length === 10) {
      if (mediaQuery) {
        return "472px"
      }
      return "922px"
    }
    return
  }

  const style = {
    hand: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "10px auto",
      border: "solid 1px black",
      backgroundColor: `rgb(245, 245, 255)`,
      width: determineWidth()
    },
    cardHolder: {
      display: "flex",
      position: "relative",
      margin: "10px 10px",
    },
  }

  return (
    <div>
      {playerState.hand.length !== 0 ? (
        <div style={style.hand}>
          {playerState.hand.map((card, index) => (
            <div 
              style={style.cardHolder}
              key={index}
            >
              <DraggableCard
                index={index}
                card={card}
                location={"hand"}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default PlayerHand
