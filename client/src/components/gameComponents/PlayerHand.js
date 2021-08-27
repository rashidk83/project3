import React from "react";
import { useMediaQuery } from "react-responsive"
import { useGameContext } from "../../context/GameContext"

import Card from "./Card"
import CardContainer from "./CardContainer";
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
    if (mediaQuery) {
      return `${Math.ceil(playerState.hand.length / 2) * 90 + 22}px`
    }
    return `${playerState.hand.length * 90 + 22}px`
  }

  const style = {
    cardHolder: {
      margin: "10px",
    },
  }

  return (
    <div>
      {playerState.hand.length !== 0 ? (
        <CardContainer
          width={determineWidth()}
          location={"hand"}
        >
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
        </CardContainer>
      ) : (
        <></>
      )}
    </div>
  )
}

export default PlayerHand
