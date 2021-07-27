import React from "react";
import { useGameContext } from "../../context/GameContext"

function CurrentPlayerBanner () {
  const { playerState, gameState } = useGameContext()

  return (
    <>
      <h1>Current Player: {playerState.number}</h1>
    </>
  )
}

export default CurrentPlayerBanner
