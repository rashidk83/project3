import React from "react";
import { useGameContext } from "../../context/GameContext"

function GoOut() {
  const { gameState, playerState, setPlayerState } = useGameContext()

  const handleGoOut = () => {

  }

  // DISPLAY
  const style = {
    container: {
      display: "flex",
      justifyContent: "center"
    },
    goOut: {
      margin: "10px",
      border: "black 1px solid",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100px",
      backgroundColor: "rgb(100, 200, 100)"
    }
  }

  return (
    <div style={style.container}>
      {gameState.action === `player-${playerState.number}-turn` && playerState.hand.length === 10 ? (
        <div 
          style={style.goOut}
          onClick={handleGoOut}
        >
          Go Out
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default GoOut
