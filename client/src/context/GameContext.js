import React, { useEffect, useState, createContext, useContext } from "react";
import { useSocketContext } from "./SocketContext"

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext)
}

export const GameProvider = ({ player, children }) => {
  const  socket  = useSocketContext()
  const [gameState, setGameState] = useState({
    deck: [],
    discard: [],

    action: "setUp",
    score: {
      player1: 0,
      player2: 0
    },
  })
  const [playerState, setPlayerState] = useState({
    number: player,
    hand: [],
    sets: [[], [], [], []],
    turn: false,
    mustDiscard: false,
    declaredEnd : false,
    score: 0
  })


  useEffect(() => {
    if (socket == null) return
    console.log(socket)

    socket.on("receive_state", (newState) => {
      console.log("receive")
      setGameState(newState)
    })

    // return () => socket.off("receive_state")
  }, [socket])

  function updateGameState(newState) {
    socket.emit("send_state", newState)
  }

  return (
    <GameContext.Provider value = {
        { 
          gameState, 
          updateGameState,

          playerState,
          setPlayerState
        }
      }>
      {children}
    </GameContext.Provider>
  );
};

