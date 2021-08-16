import React, { useEffect } from "react";

import CurrentPlayerBanner from './CurrentPlayerBanner'
import Action from './Action'
import PlayerHand from './PlayerHand'
import Draw from './Draw'

import { useGameContext } from "../../context/GameContext"

//GAME FUNCTION
function Game() {
  const {
    gameState, updateGameState,
    playerState, setPlayerState,
    draggedCard, setDraggedCard,
  } = useGameContext()

  useEffect(() => {

  }, [])

  //DISPLAY
  const display = () => {
    if (gameState.action === "force_quit") return (<h1>Disconnected</h1>)
    if (gameState.action === "game_ended") return (<h1>Game Complete</h1>)
    else return (
      <div style={game}>
        <CurrentPlayerBanner />
        <Action />
        <PlayerHand />
        <Draw />
      </div>
    )
  }

  const game = {
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: `rgb(235, 255, 212)`,
    height: "100%",
    minHeight: "100vh"
  }

  return (
    display()
  );
}

export default Game;
