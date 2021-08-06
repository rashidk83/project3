import React from "react";
import { useGameContext } from "../../context/GameContext"

function CurrentPlayerBanner () {
  const { playerState, gameState } = useGameContext()

  return (
    <div className="current-player-banner">
      <h1>Current Player: {playerState.number}</h1>
    </div>
  )
}

export default CurrentPlayerBanner
