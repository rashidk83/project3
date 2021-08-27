import React from "react";
import { useGameContext } from "../../context/GameContext"
import { useMediaQuery } from "react-responsive"

import DraggableCard from "./DraggableCard"
import CardContainer from "./CardContainer";
import Card from "./Card"

function Sets() {
  const {
    gameState, setGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  // DISPLAY

  const mediaQuery = useMediaQuery({ query: '(max-width: 1022px)' })

  const determineSetWidth = (ref) => {
    if (ref.length === 0) return "112px"
    if (mediaQuery) {
      return `${Math.ceil(ref.length / 2) * 90 + 22}px`
    }
    return `${ref.length * 90 + 22}px`
  }

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
      // border: "solid 1px black",
    },
    cardHolder: {
      margin: "10px",
    },
  }

  return (
    <div>
      {gameState.action === playerState.number && playerState.action === "declareSets" ? (
        <div style={style.setsContainer}>

          <div
            style={style.setContainer}
          >
            <h6>Set 1</h6>
            <CardContainer
              width={determineSetWidth(playerState.sets[0])}
              location={"sets.0"}
            >
              {playerState.sets[0].length ? (
                <>
                  {playerState.sets[0].map((card, index) => (
                    <div
                      style={style.cardHolder}
                      key={index}
                    >
                      <DraggableCard
                        index={index}
                        card={card}
                        location={"sets.0"}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div
                  style={style.cardHolder}
                >
                  <Card display="Add Here" suit="" />
                </div>
              )}
            </CardContainer>
          </div>

          <div
            style={style.setContainer}
          >
            <h6>Set 2</h6>
            <CardContainer
              width={determineSetWidth(playerState.sets[1])}
              location={"sets.1"}
            >
              {playerState.sets[1].length ? (
                <>
                  {playerState.sets[1].map((card, index) => (
                    <div
                      style={style.cardHolder}
                      key={index}
                    >
                      <DraggableCard
                        index={index}
                        card={card}
                        location={"sets.1"}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div
                  style={style.cardHolder}
                >
                  <Card display="Add Here" suit="" />
                </div>
              )}
            </CardContainer>
          </div>

          <div
            style={style.setContainer}
          >
            <h6>Set 3</h6>
            <CardContainer
              width={determineSetWidth(playerState.sets[2])}
              location={"sets.2"}
            >
              {playerState.sets[2].length ? (
                <>
                  {playerState.sets[2].map((card, index) => (
                    <div
                      style={style.cardHolder}
                      key={index}
                    >
                      <DraggableCard
                        index={index}
                        card={card}
                        location={"sets.2"}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div
                  style={style.cardHolder}
                >
                  <Card display="Add Here" suit="" />
                </div>
              )}
            </CardContainer>
          </div>

          <div
            style={style.setContainer}
          >
            <h6>Unmatched</h6>
            <CardContainer
              width={determineSetWidth(playerState.sets[3])}
              location={"sets.3"}
            >
              {playerState.sets[3].length ? (
                <>
                  {playerState.sets[3].map((card, index) => (
                    <div
                      style={style.cardHolder}
                      key={index}
                    >
                      <DraggableCard
                        index={index}
                        card={card}
                        location={"sets.3"}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div
                  style={style.cardHolder}
                >
                  <Card display="Add Here" suit="" />
                </div>
              )}
            </CardContainer>
          </div>

        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Sets
