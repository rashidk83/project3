import React from "react";
import { useGameContext } from "../../context/GameContext"

function PlayerHand() {
  const { playerState, gameState } = useGameContext()
  console.log(gameState.deck)

  return (
    <>
     {playerState.hand.map((card, index) => (
       <p key={index}>{card.suit}{card.displayVal}</p>
     ))}
    </>
  )
}

export default PlayerHand
