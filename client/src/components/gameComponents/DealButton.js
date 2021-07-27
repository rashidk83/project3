import React from "react";
import { useGameContext } from "../../context/GameContext"

function DealButton() {
  const { gameState, dealCards, playerState } = useGameContext()

  return (
    <>
      <p>{gameState.action}</p>
      {gameState.action === "ready-to-deal" && playerState.number === "1" ? (
      <>
        <button onClick={dealCards}>DEAL</button>
      </>
      ) : (
      <></>
      )}
    </>
  )
}

export default DealButton
