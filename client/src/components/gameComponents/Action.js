import React from "react";
import { useGameContext } from "../../context/GameContext"

function Action() {
  const { gameState, dealCards, playerState } = useGameContext()

  return (
    <div className="action">
      <p>{gameState.action}</p>
      <p>{playerState.action}</p>
      {gameState.action === "ready-to-deal" && playerState.number === "1" ? (
        <button onClick={dealCards}>DEAL</button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Action
